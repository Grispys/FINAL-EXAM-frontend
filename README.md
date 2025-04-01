
# Software Development Final Exam Frontend

This is the frontend website for the Datastructures final exam of my software development course at Keyin.

## How to?

To start this whole thing up, you'll need the backend of this project. It's a Java Maven
database that uses MySQL workbench, found here:

Once you have that up and running, you can start up this frontend site. I highly recommend using VSCodes LiveServer extension. Start up the website, and start making number submissions. The site sends a post request with your set of numbers to the backend, where it's sorted through and turned into a binary search tree. The site then makes a get request for that tree, and displays it.
