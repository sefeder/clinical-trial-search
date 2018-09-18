# SearchReport App

### Description 

This is a client-side app that lets users search the Open Trials API for clinical trials. Pertinent information on each trial is displayed, and the user has the option of saving each trial to a final report. The user can then see a preview of the final report, name it, and download it as a pdf.

### Instructions for Use

1. <code>$ yarn install</code>
2. <code>$ yarn start</code>

### Assumptions

This app assumes users would only want/need to search for trials by keyword (instad of other search paramaters such as date, status, or trial ID number). It assumes the provided fields of status, age range, target sample size, gender, conditions, interventions, locations, records, documents, and summary are the only fields that a user would want/need to see for each trial. It also assumes that each trial search occurs in one sitting, meaning there is no data persistence if the user were to hit refresh on the browser.

### Links
* Github:  https://github.com/sefeder/clinical-trial-app

![Screenshot of SearchReport](public/searchReportLandingScreenShot.png)

### Technologies Used
* JavaScript
* ReactJS
* JSX
* CSS
* HTML
* yarn
* RESTful API calls

### Future Versions
In future versions of the app, I would add a backend database component and sessions to allow specific users to log in to a portal and maintain a running table of all their searches. Also I would build in functionality to allow users to search with other parameters and provide more options of what fields to include in their final reports.
