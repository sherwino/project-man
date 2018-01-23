# Project Man
This is an intranet/web application that can be used to log all of the projects that we have at the company. The app is designed to be a simple tool that will replace a few error prone Excel spreadsheets. 

*...but Sherwin, why didn't you just protect sheets in Excel?* Like I said, Excel is very prone to errors, and I would have to inconvenience others with protected sheets, and other features like tracking/review. A

ALSO, when you share a spreadsheet with users to access the sheet simultaneously (which is a pretty cool feature) you lose a bunch of functionality. 

The idea is that a lot of these issues can be solved with simple CRUD functionality. Keeping track of who made the last changes to the database is easy, I could also use permissions to show users only what they are supposed to see. 

The latest version of the site is on heroku [here](https://project-man-app.herokuapp.com/)

## Technologies Used
Here are some of the technologies I used to build the site. Since this is a work in progress everything is subject to change.

Site was built using:

- HTML
- CSS
- JavaScript
- Heroku (hosting)
- MongoDB
- Express
- Node.JS
- JQuery
- Bootstrap
- Github
- Amazon S3
- Passport
- bCrypt (should I even be advertising this...maybe not, I'm going to change it and not tell you)

## Screenshots
Here are some screenshots showing the latest version of the site.

### Home Page
![Home Page](https://i.gyazo.com/f0f08b9968a9a0154ddee8d843b7925d.jpg)

### Login (don't know why I am showing this)
![Login Page](https://i.gyazo.com/c087d4dea264a9bf057646f4fca4b5bd.png)

### Project Log (for regular users)
![Project Log Page](https://i.gyazo.com/3c57859d1d8d0a73acb2246543d99c70.png)

### Fullscreen Search
![Fullscreen Search](https://i.gyazo.com/ab6cdd7f3cba892b65861c1572c771b6.png)

### Results
![Search Results](https://i.gyazo.com/d83e1b73a59655c86188ba8804d9921c.jpg)

### Project Page (work in progress)
![Project Page](https://i.gyazo.com/6b4f8d79ddf5b6b357e01afaaf9ce196.jpg)

## ToDo
Features that I would like to add to the site.

- You should be able to search all fields, and you can now, except for the imported jobs one of the csv fields didn't match.
- Fuzzy search, should let people get results even if they make a typo, often co-workers don't know how a job is spelled. The regex I have now allows for partial search, lowercase, uppercase. 

## Known Issues
A checkmark would imply that I have fixed one of the issues. 

- [ ] NaN --- I know how to solve this but I haven't had the change to get to it
- [ ] Empty fields in the project log, this is related to the NaN issue
- [x] Forms get angry at you when you leave the picture upload section blank, *what if you don't want to send a pic?*
- [x] You should be able to click on the job type/client and any other categories to give you a list of jobs by in that category.
- [x] This one is big...when you EDIT a project, the post/update request creates a new entry in the DB

### Change Log
Extended descriptions of what has changed with each commit.

- v0.01 - Initial



