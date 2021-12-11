//requiring the express 
express = require('express');

//creating a jobList/list of jobs
let jobList = require('./jobs.json');

//creating an express server
const app = express();

//using middleware
app.use(express.urlencoded({extended:true}))

//serving static contents
app.use(express.static('static'));

//getting full JSON List
app.get('/jobsInJson', (req,res) => {
    //sending full JSON List
    res.send((jobList));
})

//Question 1: The categories mentioned in all the jobs and how many times each category was mentioned.
app.get('/categories', (req,res) => {

    //creating an array to store the categories
    let category = {};
    let j=jobList;

    //looping over joblist
    for (let a in j)
    {
        //double looping over each category
        for(let b of jobList[a].categories)
        {
            if (b in category)
            {
                //adding to category array if it doesnt already exist
                //incrementing
                category[b]++;
            }
            else 
            {
               //else setting to 1
               category[b] = 1;
            }
        }
   }

   //sending array
   res.json(category);

 })

//Question 2: All the jobs with a given category (sent as a parameter)
app.get('/category/:theCategory', (req,res) => 
{
    //creating an array to store jobs with a given category
    let jobCategory = {};  //creating an object of jobs to add the jobs with certain category into it

    //looping over joblist
    for (let a in jobList)
    {
        //checking if the title includes the category
        if (jobList[a].categories.includes(req.params.theCategory)) 
        {
            //adding to array jobCategory
            jobCategory[a] = jobList[a];
        }
    }
    //sending array
    res.json(jobCategory);
 })

 //Question 3: All jobs in a given city (sent in the querystring)
 //this one works with the index.html file :)
app.get('/jobs-in-a-given-city', (req,res) => {

    //creating an array to store jobs in a given city
   let jobs = {};  

    //looping over joblist
    for (let a in jobList)
    {
        //checking if  the title includes the city
        if (jobList[a].title.includes(req.query.city)) 
        {
            //adding title to array
            jobs[a] = jobList[a].title;
       }
   }

    //sending array
    res.send(JSON.stringify(jobs));

 });




app.listen(1000);

