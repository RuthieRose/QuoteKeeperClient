# QuoteKeeper.io 

This is the new and better front end of my Nucamp Honors project and it utilizes React. 

The backend repo is https://github.com/lilyruth/newQuoteKeeperServer.

The deployed project is at https://quotekeeper.io. 

The YouTube demo is: https://youtu.be/qjG5cuszlDo.

Users can:
- View quotes without registering
- Register (will receive a confirmation email) 
- Save quotes
- View a paginated list of saved quotes
- View individual quotes and pick from various backgrounds for that quote
- Tweet individual quotes
- Email individual quotes
- Delete individual quotes
- Add their own quotes
- View a random quote from their saved list
- Request a password reset (They receive an email with a temporary password that is hashed in the db and then deleted when a new password is set)
- Reset their password
- Delete their account

## State and more state and state highways (routes)

I really wanted to avoid wet noodle code (it's not dry, it's also spaghetti) but that would have required planning in advance how to handle the data flow. And I couldn't plan because I didn't understand how the data was going to have to flow. The planning process for my next full stack project is going to look very different from this one because of what I learned! 

### Security and privacy
I did not want to use local storage or cookies, so the auth token is kept in state. Also, it makes no sense to have a refresh token because this is a goofy, unimportant app. One token to rule them all for 60 minutes. After that, you log in again, because who is going to spend hours in this app? No one. And that's good because I can't handle that much traffic anyway. :D But not using local storage for any data means a lot of global state handling and that got to be messy really fast.

### To advance or not to advance, how is the question
The backend was so simple compared to what has to happen on the front end. First, I have the cached set of quotes that changes every hour that I need to retrieve from my API. I found it super annoying that every time I switched to a different component, the quotes would reset to the first one in the cache. That's a bad user experience. Global state stores the index that the user is on so the user gets a new quote every time they return to the Quotes screen. 

### Global state versus props
One weakness of my lack of planning is I probably used global state for some places where I simply could have passed props instead. For example, if the user is on their saved quotes page, they can click on the image icon to view that quote and add a background. The quote and author are set in global state to be retrieved by the display page. That probably could have been set up as props instead if I made the display quote page a child of the saved quotes page. That will be in an upcoming refactor (and since this is version 2, I have no doubt I will continue to iterate on this project).

### Props for displaying and hiding components
I did utilize props and lifting state up for displaying and hiding certain components depending on the view. The quote of the day does not need to render for account management functions, for example. 

### Dynamic backgrounds
One of my favorite parts of this app is giving the user the ability to choose a background so they can screenshot their quote. I haven't had a lot of experience with dynamic classes and this gave me an opportunity to practice that. I've had trouble in the past with rendering images in React and for some reason that all came together very nicely this time. In the future I hope to add more backgrounds and also dynamically change the font color as well to be able to utilize more backgrounds. That will also be for version 3. 

### Cause and Effect
Did I overuse useEffect, or should I have broken components up into smaller components? Yes and yes. Again, will be on an upcoming refactor. That being said, there's nothing like having to implement useEffect for a whole lot of dynamic content in order to get a good grip on it. Add the dependency!! "Why is this not updating?" Add the dependency!! And it updates. Every time. "Repetition is the mother of all learning" as one of my college teachers used to say. Sometimes I had to get creative about which dependency I added (saving and deleting quotes for example), and I may have an extra useEffect call because I couldn't math the first time on writing the pagination in the saved quotes page, but once something is working you don't delete it until the refactor. I don't write the rules. :D

### Breaking It Down
I spent way too long on the CSS trying to make every piece responsive at all the breakpoints. The changing header height (login to register to nav-- and fixed height for header just wouldn't make sense with the extra space needed for register) made doing a footer nearly impossible. I take it as a point of pride that when I design a website, cell phones don't break them. That being said, even after three days of CSS, I'm still not super happy with the mobile versions, and I have to admit there is a use case for React Native. Phones just have a different UX. I will eventually code this as an app. Eventually. I like to say I don't like React Native but it was actually not bad to work with. I kind of missed it this go-round tbh. 

On my next iteration, I will probably just use traditional register and login screens and leave the nav bar as a nav bar. Was I trying to be artsy? If I was it was unconscious. I just really liked the idea of having all the business at the top where it would go away instead of separate screens. Maybe I will move register to its own page and leave the login. I have to think about this. 

### Done Is Better than Perfect

As I was coding all of this and reworked parts of it, and as I began to better understand the flow of data, I knew I had to decide whether I wanted it well designed or whether I wanted it finished. I'm on a deadline not for this project but because I have other projects that have deadlines and this project was one of those now-or-someday opportunities. I initially gave myself one week and allowed myself to stretch it into two to get it done. Restructuring it in order to make it more best practices compliant would have required weeks 3 and 4, which for many reasons are not possible right now. So instead of sending this to the graveyard of might-have-been-projects, I gritted my teeth, decided it was worth it for whatever critical feedback I might get (and of course learn from!), made mental notes of what I will do differently next time and for future projects, and decided to finish. 

And by finish I mean pay for a Heroku hobby dyno, pay for a domain name, upload it and let it be a real product that people can choose to use. Even if it's frivolous, it's out there. It's manually tested several different ways. (Learning automated testing is definitely on my to-do list.) It absolutely has a few bugs I will need to fix once I find them. It is done. And flawed as it is, it means a lot to me. <3



