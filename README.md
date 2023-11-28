# Head To Head
## Elevator Pitch
Dogs vs Cats, Batman vs Superman, BYU vs Utah. There are many famous rivalries throughout history. Head To Head is a weekly social poll that pits two rivals against each other and polls users to see who comes out on top. Each week you will be able to vote on which side should win and be able to see the percentages change live.

## Design

![Poller](Poller.jpg)
This is the poller before and after the user has voted for the week.
![History](History.jpg)
This is what the previous results look like, the underlined choice is what the user voted for.

## Key Features

- User login over HTTPS
- Ability to vote on the poll
- Poll that changes weekly 
- History of previous polls and how user voted
- Live results of current poll after user has vote
- Database to store poll results and users votes

## Technologies

- **Authentication** - User will be able to create and log into an account. User will only be able to vote while logged in.
- **Database data** - Poll results for current and past polls are stored in a database as well as login credentials.
- **WebSocket data** - The current poll results will be displayed live as other users vote on the poll.

## HTML Deliverables
- **HTML Pages** - Added 3 HTML pages for Login, Voting, and Previous Results.
- **Links** - Have 3 links at the top of each page, the links to vote will not be accessible unless logged in.
- **Text** - All of the votes will be represented with text as well as previous voting results on prev.html.
- **Images** - Has an image for each current voting option.
- **Login** - Input box and submit button for username and password to login.
- **Database** - Previous votes will be data pulled from the database.
- **WebSocket** - As voting happens, the current percentage will be presented.