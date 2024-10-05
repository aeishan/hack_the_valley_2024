from flask import Flask,jsonify, render_template, url_for, flash, redirect, request, session

app = Flask(__name__)


@app.route('/', methods = ['GET', 'POST'])
def register():
    return render_template()


if __name__ == '__main__':
    app.run(debug=True)
