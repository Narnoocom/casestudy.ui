# casestudy.ui
 
## Introduction & Objectives
The client works closely with clients to build a mutually profitable relationship, ensuring their long-term success, through the understanding of their needs and the needs of their customers.
The overall purpose of this document is to list all requirements for the Dummy Company Leave management, and to outline all necessary development tasks and timelines for completion.
The objective of this document is to offer visibility into the planning and development process of the Leave management, allowing the chance to review and provide feedback on the stated features as well as highlight any outstandings.


## Purpose
Dummy Company would like to have a way to manage their leave as they have seen competitors with a similar feature as seen below. This would allow them to easily manage their leave and save them a lot of time then doing them manually.

## Details
The home screen should have a list of all the current leave requests and a button to add a new one.
Clicking the create button should generate a model with a form to create a new leave request.
The form should have:
● a date picker for the start and end date
● a dropdown with the leave types
○ personal
○ sick
○ vacation
○ bereavement
● a place to display the number of days with a maximum of 2 decimal points with the floor rounding, eg if it calculates 4.376, it should show 4.37, this should recalculate every time that start/end time changes, this does not need to be saved and is for visual purposes only.
● a text area for the reason
○ max characters 50
● a dropdown with a list of users to assign the leave to (a dummy list of about 10 should do, these can be hard coded for this exercise),
Clicking the save button should save the leave request, if the request fails from the below reasons show an indicator with what failed or return to the home screen on success.
It should fail if:
● the leave request overlaps with an existing one.
● the start date is before the current date.
● the end date is before the start date.
● the reason is empty.
● the number of days is 0.
● the leave type is empty.
● the user is empty.
Clicking the cancel button should return to the home screen without saving the leave request.

On the home screen the list of leave requests should be sortable by:
● start date
● end date
● number of days
● leave type
● user
The leave requests should also be searchable with a search bar.
The leave items should be able to be filtered by start/end date and User.
The client has stated they are happy for us to work out a way to display them, and has provided 2 options, a) separate tables grouped by client or b) all in one table.
clicking on a leave request should open a view with the leave request details and a way of editing them.

For load testing, create 10,000 fake leave requests. Tools/languages to use:
● PHP backend (laravel)
● MYSQL database
● React with Vite and typescript frontend
● plus any other libraries you like