/* 
For information about LADDI, please visit laddi.io or reach out to matt@matthewbibby.com

An Execute JavaScript trigger needs to be added to Storyline that runs whenever you want to send data to the database. It should contain this code:

    player = GetPlayer();
    laddiPost();

Then, the index_lms.html file needs to be edited to include these scripts before the closing </html> tag:

      <!-- START LADDI  -->
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
      <script src="https://cdn.jsdelivr.net/gh/MatthewBibby/laddi-f4070b0f96502fc27b66c09b2868b6f0/laddi-f4070b0f96502fc27b66c09b2868b6f0.js"></script>
      <!-- END LADDI -->  

    */

function laddiPost() {        
    // Grab username from LMS SCORM 2004 (text)
         if (!window.gotName) {
            function findLMSAPI(win) {
                if (win.hasOwnProperty("GetStudentID")) return win;
                else if (win.parent == win) return null;
                else return findLMSAPI(win.parent);
            }
            const lmsAPI = findLMSAPI(this);
            let name = lmsAPI.SCORM2004_GetStudentName();
            let nameArray = name.split(',');
            let firstName = nameArray[1];
            let lastName = nameArray[0];
            let fullName = firstName + ' ' + lastName;
            window.player.SetVar("nameLMS", fullName);
            window.gotName = true;
        }

    // Grab date (text)
    let date = new Date();

    // Grab name LMS (text)
    let nameLMS = window.player.GetVar("nameLMS");

    // Grab name course (text)
    let nameEntry = window.player.GetVar("Name");

    // Overall progress (num)
    let progressOverall = window.player.GetVar("1_6_Progress_Overall");

    // Our World of Brewing 
    let progressOWOB = window.player.GetVar("1_6_Progress_OWOB");

    // Brewery Hygiene
    let breweryHygiene = window.player.GetVar("1_6_Progress_Brewery_Hygiene");

    // Brewing Technology
    let brewingTechnology = window.player.GetVar("1_6_Progress_Brewing_Technology");

    // Beer Styles
    let beerStyles = window.player.GetVar("1_6_Progress_Beer_Styles");

    // Recipe Forumulation
    let recipeFormulation = window.player.GetVar("1_6_Progress_Recipe_Formulation");

    // Kegging of Beer
    let keggingOfBeer = window.player.GetVar("XX1_6_Progress_Kegging_Of_Beer");

    // Utilities and Engineering
    let utilitiesAndEngineering = window.player.GetVar("1_6_Progress_Utilities_Engineering");

    // Workbooks
    let workbooks = window.player.GetVar("1_6_Progress_Workbooks");

    // Introduction to Lean Manufacturing
    let introToLeanManufacturing = window.player.GetVar("1_6_Progress_Introduction_to_Lean_Manufacturing");

    // Intro to the SC Operating System
    let introToSCOperatingSystem = window.player.GetVar("1_6_Progress_Intro_To_The_SC_Operatin_System");

    // Clearance Tasting
    let clearanceTasting = window.player.GetVar("1_6_Progress_Clearance_Tasting");

    // IBD
    let IBD = window.player.GetVar("1_6_Progress_IBD");

    // Notebook
    let notebook = window.player.GetVar("Notebook");

    // No SCOS
    let noSCOS = window.player.GetVar("1_4_No_SCOS_False");

    // No Utilities and Engineering
    let noUtilitiesAndEngineering = window.player.GetVar("1_4_No_UAE_False");

    // No Clearance Tasting
    let noClearanceTasting = window.player.GetVar("1_4_No_Clearance_Tasting_False");

    // No Kegging and No Clearance
    let noKeggingAndNoClearance = window.player.GetVar("1_4_No_Kegging_No_Clearance_False");

    // No Kegging and No UAE
    let noKeggingAndNoUAE = window.player.GetVar("1_4_No_Kegging_No_UAE_False");

    // No UAE and No Clearance
    let noUAEAndNoClearance = window.player.GetVar("1_4_No_UAE_No_Clearance_Tasting_False");

    // Date - Clearance Tasting
    let dateClearanceTasting = window.player.GetVar("7_2_Date_Clearance_Tasting");

    // Date - IBD
    let dateIBD = window.player.GetVar("6_3_Date_IBD");

    // Axios post 
    axios({
            method: "POST",
            url: "https://laddi.app/user",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            data: {
                clientId: "1c8dbddf9165922df29773c7b440a7e2322ca22d41cf3d53affdfc48a1e453f1",
                courseName: "Craft Gold",
                date: date,
                nameLMS: nameLMS,
                nameEntry: nameEntry,
                progressOverall: progressOverall,
                progressOWOB: progressOWOB,
                breweryHygiene: breweryHygiene,
                brewingTechnology: brewingTechnology,
                beerStyles: beerStyles,
                recipeFormulation: recipeFormulation,
                keggingOfBeer: keggingOfBeer,
                utilitiesAndEngineering: utilitiesAndEngineering,
                workbooks: workbooks,
                introToLeanManufacturing: introToLeanManufacturing,
                introToSCOperatingSystem: introToSCOperatingSystem,
                clearanceTasting: clearanceTasting,
                IBD: IBD,
                notebook: notebook,
                noSCOS: noSCOS,
                noUtilitiesAndEngineering: noUtilitiesAndEngineering,
                noClearanceTasting: noClearanceTasting,
                noKeggingAndNoClearance: noKeggingAndNoClearance,
                noKeggingAndNoUAE: noKeggingAndNoUAE,
                noUAEAndNoClearance: noUAEAndNoClearance,
                dateClearanceTasting: dateClearanceTasting,
                dateIBD: dateIBD
            },
        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        });
}
