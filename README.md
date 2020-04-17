# book-an-appointment

a [Sails v1](https://sailsjs.com) application

### Links

- [Sails framework documentation](https://sailsjs.com/get-started)
- [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
- [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
- [Community support options](https://sailsjs.com/support)
- [Professional / enterprise options](https://sailsjs.com/enterprise)

### Version info

This app was originally generated on Sat Mar 21 2020 18:01:58 GMT+0530 (India Standard Time) using Sails v1.2.3.

<!-- Internally, Sails used [`sails-generate@1.16.13`](https://github.com/balderdashy/sails-generate/tree/v1.16.13/lib/core-generators/new). -->

<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

## List of APIs

- create an advisor

#### POST http://{hostname}:{port}/advisor

##### payload

    {
        "type": "Advisor",
        "firstName": "Poulami",
        "lastName":"Biswas",
        "email": "Poulami.Poulami@abc.com",
        "meetingLink": "zoom_id_1"
    }

- retrieve an advisor

#### GET http://{hostname}:{port}/advisor?email=some.admin@abc.com

- retrieve all advisors

#### GET http://{hostname}:{port}/advisor

- delete an advisor

#### DELETE http://{hostname}:{port}/advisor?email=some.admin@abc.com

- block advisor's calendar by admin

#### POST http://{hostname}:{port}/advisors/6/calendar/block

##### payload

    {
        "day": "Wednesday",
        "startTime": "10:00",
        "endTime":"11:00"
    }

- book an appointment

#### POST http://{hostname}:{port}7/users/12/appointment

##### payload

    {
        "advisorId": 6,
        "appointmentDate": "2020-03-19",
        "appointmentStartTime":"4:00",
    	"appointmentEndTime":"4:30",
    	"remarks": "some random remark"
    }

- fetch all availability for particular advisor

#### GET http://{hostname}:{port}/get-all-availability?userId=12&advisorId=19

- fetch all availability for all advisors

#### GET http://{hostname}:{port}/get-all-availability?userId=12
