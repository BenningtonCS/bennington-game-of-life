# Bennington Game of Life

###### Rough Steps to deploy on localhost/replicate:
- Have python installed
- clone repo into directory
- run `pip install virtualenv` 
- Go up one folder and run `virtualenv ENV` (ENV is just the name of the virtual environment that will contain the project's dependencies)
- run `ENV/Scripts/activate` and cd to the repo again
    - On Linux/MacOS, the script might be stored in `ENV/bin/activate` instead. You also might have to give execute permission to the file before being able to run it: `chmod +x ENV/bin/activate`
- run `pip install requirements.txt`(Install all the dependencies in your virtual environment)
    - If an error pops up about not being able to find the package `requirements.txt`, try running `pip install -r requirements.txt` instead.
- run `python manage.py runserver`

## Boom you should be live at local host or 127.0.0.1:8000.

# Project Goals

###### Buttons: 
Start, pause, step, reset, patterns (documented, user’s)(search function inside), randomize (reset and make a random board)

###### Upgrade: (the third week)
win-lose function (all can be incorporated in different modes)
Load a pattern and make it alive as long as possible and win a score, the machine will try to stop the user
Multiple users playing and who keep a shape longer wins
Load a pattern and try to make it die as soon as possible
Changing the game while it is running
Either static board or infinite board modes

###### Technologies:
Python backend
Javascript for front end and interactivity
Jangle framework
Github

###### Tasks:
Creating the website on jangle (Julian)
Creating the front end part (julian and emmanuel)
Creating the back end (dina and quang)

After jullian creating the repositories the step are:
1- the basic grid (static for now, no scrolling)
creating the empty grid (drawing, canvas, HTML) 
keep a set of points alive as the game state
Given the game state, display it in the screen (bunch of yellow squares)
When a user click on the appropriate the square, change the state of the square (add or remove the point to the set and then display the set)
Add the start button, when the user click it, the game run
2- adding the other buttons:
When the user click on pause, the loop get paused (need to search to know how to know that)
Same with the step and reset buttons
3- go to the back end do the server parts:
Upload the documented patterns and link that to the front end
4- start the upgrade parts

 

Our first group meeting on sunday 


 
