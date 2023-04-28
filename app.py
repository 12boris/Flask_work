from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flask.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class bots(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    bot_name = db.Column(db.String(300), nullable=False)
    course_name = db.Column(db.String(300), nullable=False)
    course_id = db.Column(db.String(300), nullable=False)
    telegram_id = db.Column(db.String(300), nullable=False)

    def __repr__(self):
        return '<work_with_tokens %r>' % self.bot_name
    

@app.route('/bots/<int:telegram_id>', methods=['GET', 'POST'])
def my_bots(telegram_id):
    if request.method == 'POST':
        # удаление бота
        try:
            course_id = request.form['deleted_bots']
            bot = bots.query.filter_by(telegram_id=telegram_id, course_id=course_id).first()
            db.session.delete(bot)
            db.session.commit()
        except:
            pass
    
    # список ботов
    bots_list = bots.query.filter_by(telegram_id=telegram_id)
    return render_template('bots.html', bots_list=bots_list, telegram_id=telegram_id)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()

        bot = bots(bot_name="test_bot_name", course_name="test_name", course_id="1", telegram_id="2")

        db.session.add(bot)
        db.session.commit()
        
    app.run(debug=False, port=5050)
