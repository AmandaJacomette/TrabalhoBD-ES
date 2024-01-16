from flask import Flask, jsonify, request
from flask_cors import CORS
import datetime
import requests
import json
import pandas as pd
import psycopg2
 
x = datetime.datetime.now()
 
# Initializing flask app
app = Flask(__name__)
CORS(app)

# Função para criar conexão no banco
def conecta_db():
  con = psycopg2.connect(host='localhost', 
                         database='supermercadoBD',
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
 
@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Hello from Python backend!'}
    return jsonify(data)

@app.route('/api/sendDados', methods=['POST'])
def send_data():
    data = request.json  # Os dados do formulário serão enviados como JSON
    print("Dados recebidos:", data)
    login = data['login']
    senha = data['senha']
    reg = consultar_db('select * from public.operador where cpfop = \'' + login +'\' and senhaop = '+ str(senha))
    print("Dados banco:", reg)
    if(len(reg) > 0):
        df_bd = pd.DataFrame(reg, columns=['idope', 'cpfop','senhaop','opnome',
                                   'datainiop','salarioop',
                                   'horainter'])
        df_bd.head()
        df_bd = df_bd.to_json()
        data = {'error': False}
        result = 0
    else:
       df_bd = {}
       data = {'error': True}
       result = 1
    return data

# Route for seeing a data
@app.route('/data')
def get_time():
 
    # Returning an api for showing in  reactjs
    return {
        'Name':"geek", 
        "Age":"22",
        "Date":x, 
        "programming":"python"
        }
 
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)