import json
import sqlite3
from flask import Flask, render_template, redirect, url_for,request
from flask import make_response
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
 
conn = sqlite3.connect('supermanagerDB.db')
if conn:
    print("Successfully Connected...")
 
cursor = conn.cursor()

@app.route('/showTable', methods=['GET'])
def showTable_json():
    tableName = request.form['entity']
    cursor.execute("SELECT * FROM " + tableName)
    print("Selection successfull...")
 
    rows = cursor.fetchall()
    columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns, row)) for row in rows]
 
    to_json = json.dumps(data, indent=2)
    print(to_json)
    x = 1
    resp = make_response('{"response": '+x+'}')
    resp.headers['Content-Type'] = "application/json"
    return resp

@app.route('/updateOperador', methods=['GET', 'POST'])
def updateOperador():
    cpf = request.form['cpf']
    salario = request.form['salario']
    senha = request.form['senha']

    cursor.execute("SELECT * FROM OPERADOR WHERE CPFOP =" + cpf)
    data = cursor.fetchall()
    if data != None:
        if salario != 0:
            cursor.execute("UPDATE OPERADOR SET SALARIOOP = " + salario +  "WHERE CPFOP =" + cpf)
        if senha != '':
            cursor.execute("UPDATE OPERADOR SET SENHAOP = " + senha +  "WHERE CPFOP =" + cpf)
    else:
        print("ERROR: Invalid data")
        x = 0
    
    conn.commit()
    x = 1
    resp = make_response('{"response": '+x+'}')
    resp.headers['Content-Type'] = "application/json"
    return resp

@app.route('/updateRepositor', methods=['GET', 'POST'])
def updateRepositor():
    cpf = request.form['cpf']
    salario = request.form['salario']
    senha = request.form['senha']
    
    cursor.execute("SELECT * FROM REPOSITOR WHERE CPFREP =" + cpf)
    data = cursor.fetchall()
    if data != None:
        if salario != 0:
            cursor.execute("UPDATE REPOSITOR SET SALARIOREP = " + salario +  "WHERE CPFREP =" + cpf)
        if senha != '':
            cursor.execute("UPDATE REPOSITOR SET SENHAREP = " + senha +  "WHERE CPFREP =" + cpf)
    else:
        print("ERROR: Invalid data")
        x = 0
    conn.commit()

    x = 1
    resp = make_response('{"response": '+x+'}')
    resp.headers['Content-Type'] = "application/json"
    return resp

@app.route('/updateGerente', methods=['GET', 'POST'])
def updateGerente():
    cpf = request.form['cpf']
    salario = request.form['salario']
    senha = request.form['senha']

    cursor.execute("SELECT * FROM GERENTE WHERE CPFGER =" + cpf)
    data = cursor.fetchall()
    if data != None:
        if salario != 0:
            cursor.execute("UPDATE GERENTE SET SALARIOGER = " + salario +  "WHERE CPFGER =" + cpf)
        if senha != '':
            cursor.execute("UPDATE GERENTE SET SENHARGER = " + senha +  "WHERE CPFGER =" + cpf)
    else:
        print("ERROR: Invalid data")
        x = 0
    conn.commit()

    x = 1
    resp = make_response('{"response": '+x+'}')
    resp.headers['Content-Type'] = "application/json"
    return resp

@app.route('/searchFuncionario', methods=['POST'])
def searchFuncionario():
    cpf = request.form['cpf']

    cursor.execute("SELECT * FROM GERENTE WHERE CPFGER =" + cpf)
    data = cursor.fetchall()
    if data != None:
        x = 1
    else:
        cursor.execute("SELECT * FROM REPOSITOR WHERE CPFREP =" + cpf)
        data = cursor.fetchall()
        if data != None:
            x = 2
        else:
            cursor.execute("SELECT * FROM OPERADOR WHERE CPFOP =" + cpf)
            data = cursor.fetchall()
            if data != None:
                x = 3
    
    x = 0
    resp = make_response('{"response": '+x+'}')
    resp.headers['Content-Type'] = "application/json"
    return resp

@app.route('/returnFuncionario', methods=['POST'])
def returnFuncionario():
    cpf = request.form['cpf']

    cursor.execute("SELECT * FROM GERENTE WHERE CPFGER =" + cpf)
    data = cursor.fetchall()
    if data != None:
        x = 1
    else:
        cursor.execute("SELECT * FROM REPOSITOR WHERE CPFREP =" + cpf)
        data = cursor.fetchall()
        if data != None:
            x = 2
        else:
            cursor.execute("SELECT * FROM OPERADOR WHERE CPFOP =" + cpf)
            data = cursor.fetchall()
            if data != None:
                x = 3
    
    x = 0
    resp = make_response('{"response": '+x+'}')
    resp.headers['Content-Type'] = "application/json"
    return data

cursor.close()
conn.close()

if __name__ == "__main__":
    app.run(debug = True)