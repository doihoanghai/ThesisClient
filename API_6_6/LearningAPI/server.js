'use strict';
let express = require('express');
let app = express();
let port = process.env.PORT || 3000;
let jsonwebtoken = require("jsonwebtoken");
let bodyParser = require('body-parser');
var cors = require('cors');


// use it before all route definitions
app.use(cors({ origin: '*' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});


//Import Routes
//Root Routes
let routes = require('./api/routes')(app); 
//Sub Routes
let CategoryRoutes = require('./api/controllers/Category/CategoryRoutes')(app);
let CategoryCourseRoutes = require('./api/controllers/CategoryCourse/CategoryCourseRoutes')(app);
let ClassRoutes = require('./api/controllers/Class/ClassRoutes')(app);
let ClassStudentRoutes = require('./api/controllers/ClassStudent/ClassStudentRoutes')(app);
let ClassTeacherRoutes = require('./api/controllers/ClassTeacher/ClassTeacherRoutes')(app);
let CourseRoutes = require('./api/controllers/Course/CourseRoutes')(app);
let CourseSkillRoutes = require('./api/controllers/CourseSkill/CourseSkillRoutes')(app);
let CourseTeacherRoutes = require('./api/controllers/CourseTeacher/CourseTeacherRoutes')(app); 
let ExerciseRoutes = require('./api/controllers/Exercise/ExerciseRoutes')(app);
let ExerciseQuestionRoutes = require('./api/controllers/ExerciseQuestion/ExerciseQuestionRoutes')(app);
let QuestionRoutes = require('./api/controllers/Question/QuestionRoutes')(app); 
let SkillRoutes = require('./api/controllers/Skill/SkillRoutes')(app);
let UserRoutes = require('./api/controllers/User/UserRoutes')(app);
let AnswerRoutes = require('./api/controllers/Answer/AnswerRoutes')(app);
let StudentAnswerRoutes = require('./api/controllers/StudentAnswer/StudentAnswerRoutes')(app);
let StudentExerciseRoutes = require('./api/controllers/StudentExercise/StudentExerciseRoutes')(app);

app.listen(port);

console.log('RESTful API server started on: ' + port);