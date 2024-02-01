from flask import Flask, jsonify, request
from flask_cors import CORS
import datetime
import requests
import json
import pandas as pd
import psycopg2
 
datahj = datetime.datetime.now()
 
# Initializing flask app
app = Flask(__name__)
CORS(app)

# Função para criar conexão no banco
def conecta_db():
  con = psycopg2.connect(host='localhost', 
                         database='superManeger',
                         user='postgres', 
                         password='147258')
  return con

# Função para consultas no banco
def consultar_db(sql):
  con = conecta_db()
  cur = con.cursor()
  cur.execute(sql)
  recset = cur.fetchall()
  registros = []
  for rec in recset:
    registros.append(rec)
  con.close()
  return registros

def inserir_db(sql):
  con = conecta_db()
  cur = con.cursor()
  try:
    cur.execute(sql)
    con.commit()
  except (Exception, psycopg2.DatabaseError) as error:
    print("Error: %s" % error)
    con.rollback()
    cur.close()
    return 1
  con.close()

##################   ROTAS   ######################
 
@app.route('/api/login', methods=['POST'])
def send_data():
    data = request.json  # Os dados do formulário serão enviados como JSON
    print("Dados recebidos:", data)
    login = data['login']
    senha = data['senha']
    reg = consultar_db('select cpfop from public.operador where cpfop = \'' + login +'\' and senhaop = '+ str(senha))
    ger = consultar_db('select cpfge from public.gerente where cpfge = \'' + login +'\' and senhager = '+ str(senha))
    rep = consultar_db('select cpfrep from public.repositor where cpfrep = \'' + login +'\' and senharep = '+ str(senha))
    print("Dados banco:", reg)
    if(len(reg) > 0):
        df_bd = pd.DataFrame(reg, columns=['cpfop'])
        df_bd.head()
        df_bd = df_bd.to_dict()
        data = {'error': False,
                'option': 1,
                'cpfop': df_bd['cpfop'][0]}
        result = 0
    elif(len(ger) > 0):
        df_bd = pd.DataFrame(ger, columns=['cpfge'])
        df_bd.head()
        df_bd = df_bd.to_dict()
        data = {'error': False,
                'option': 2,
                'cpfge': df_bd['cpfge'][0]}
    elif(len(rep) > 0):
        df_bd = pd.DataFrame(rep, columns=['cpfrep'])
        df_bd.head()
        df_bd = df_bd.to_dict()
        data = {'error': False,
                'option': 3,
                'cpfrep': df_bd['cpfrep'][0]}
    else:
       df_bd = {}
       data = {'error': True,
               'mensage': 'Não foi possivel encontrar o funcionario'}
    return data

@app.route('/api/criaEncomenda', methods=['POST'])
def create_encomenda():
    data = request.json  # Os dados do formulário serão enviados como JSON
    print("Dados recebidos:", data)
    solicitante = data['solicitante']
    cdprod = data['cdprod']
    quantidade = data['quantidade']
    #primeiro pega produto baseado no cdprod
    #calcula valor
    valor = 0
    produto = consultar_db('select valor from public.produto where codbarras= \'' + cdprod +'\'')
    df_bd = pd.DataFrame(produto, columns=['valor'])
    df_bd.head()
    df_bd = df_bd.to_dict()
    print("Dados banco:", df_bd['valor'][0])
    valor = float(df_bd['valor'][0]) * float(quantidade)
    inserir_db('INSERT INTO ENCOMENDA (cdprod, datapedido, quantidade, valor, status, solicitante) VALUES ( \''+ cdprod +'\', \'' + str(datahj) + '\', '+ quantidade + ', ' + str(valor) + ', \'Aguardando autorização\', \'' + solicitante + '\')')
    
    return data

@app.route('/api/atualizaEncomenda', methods=['POST'])
def update_encomenda():
    data = request.json  # Os dados do formulário serão enviados como JSON
    print("Dados recebidos:", data)
    id = data['id']
    status = data['status']
    encomenda = inserir_db('UPDATE ENCOMENDA SET STATUS = \'' + status +'\' WHERE IDENCOMENDA = ' + id)
    #df_bd = pd.DataFrame(encomenda, columns=['idencomenda', 'repnome', 'prodnome', 'datapedido', 'quantidade', 'valor', 'status'])
    #df_bd.head()
   #df_bd = df_bd.to_dict()
    #print("Dados banco:", df_bd)
    data = {'error': False}
    return data

@app.route('/api/deletaEncomenda', methods=['POST'])
def delete_encomenda():
    data = request.json  # Os dados do formulário serão enviados como JSON
    print("Dados recebidos:", data)
    id = data['id']
    encomenda = inserir_db('DELETE FROM ENCOMENDA WHERE idencomenda = ' + id)
    data = {'error': False}
    return data

@app.route('/api/getEncomendas', methods=['GET'])
def get_encomenda():
    encomenda = consultar_db('SELECT E.IDENCOMENDA, R.REPNOME, P.PRODNOME, E.DATAPEDIDO,'+
                             ' E.QUANTIDADE, E.VALOR, E.STATUS'+
                             ' FROM ENCOMENDA E, PRODUTO P, REPOSITOR R '+
                             'WHERE E.SOLICITANTE = R.CPFREP AND E.CDPROD = P.CODBARRAS')
    df_bd = pd.DataFrame(encomenda, columns=['idencomenda', 'repnome', 'prodnome', 'datapedido', 'quantidade', 'valor', 'status'])
    df_bd.head()
    df_bd = df_bd.to_dict()
    print("Dados banco:", df_bd)
    return df_bd

# Running app
if __name__ == '__main__':
    app.run(debug=True)