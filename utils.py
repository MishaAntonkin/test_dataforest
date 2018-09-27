import datetime


def convert_date_to_htmlinput(date):
    valid_date = datetime.datetime.strptime(date, '%d.%m.%Y')
    return valid_date.strftime('%Y-%m-%d')
