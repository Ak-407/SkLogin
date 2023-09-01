if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
const initializePassport = require('./passport-config');
const flash = require('express-flash');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uploadsDir = path.join(__dirname, 'uploads');


if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}


initializePassport(
    passport,
    async (username) => {
        try {
            const user = await logindata.findOne({ username: username });
            return user;
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    },
    async (id) => {
        try {
            const user = await logindata.findById(id);
            return user;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            return null;
        }
    }
);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(flash());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
).env
app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', true);
mongoose.connect(
    'mongodb+srv://jsamaan:amaan123@cluster0.vz55wc0.mongodb.net/jsamaan?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const LoginData = mongoose.Schema({
    username: String,
    password: String,verified: {
        type: Boolean,
        default: false,
    },
    Advisor: [String],
    Crop: [String],
    Research: [String],
    Experiment1Year: [String],
    Experiment1Duration: [String],
    Experiment1Treatment: [String],
    Experiment1Data: [String],
    Experiment2Year: [String],
    Experiment2Duration: [String],
    Experiment2Treatment: [String],
    Experiment2Data: [String],
    Experiment3Year: [String],
    Experiment3Duration: [String],
    Experiment3Treatment: [String],
    Experiment3Data: [String],
    Experiment4Year: [String],
    Experiment4Duration: [String],
    Experiment4Treatment: [String],
    Experiment4Data: [String],
    Year: [String],
    Duration: [String],
    Treatment: [String],
    TreatmentDetails: [String],
    R1:[String],
    R2:[String],
    R3:[String],
    Faculty:[String],
    CropRCM:[String],
    ResearchRCM:[String],
    ObjectivesRCM:[String],
    executionRCM:[String],
    DurationRCM:[String],
    TreatmentRCM:[String],
    TreatmentDetailsRCM: [String],
    R1RCM:[String],
    R2RCM:[String],
    R3RCM:[String],
    Principal:[String],
    CropEXT:[String],
    ResearchEXT:[String],
    ObjectivesEXT:[String],
    executionEXT:[String],
    DurationEXT:[String],
    TreatmentEXT:[String],
    TreatmentDetailsEXT:[String],
    R1EXT:[String],
    R2EXT:[String],
    R3EXT:[String],
    uploadedFile: {
        fieldname: String,
        originalname: String,
        encoding: String,
        mimetype: String,
        destination: String,
        filename: String,
        path: String,
        size: Number,
    },

});

const logindata = mongoose.model('LoginData1', LoginData);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const absolutePath = path.join(__dirname, 'uploads');
        cb(null, absolutePath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    },
});

const upload = multer({ storage: storage });
var array;

app.get('/', function (req, res) {
    logindata.find({})
    .then(found => {
    })
    res.render('index.ejs', { name: "Syed Amaan {Date}"});
});

app.get('/login', function (req, res) {
    res.render('login', {req: req,topic: array});
});

app.get('/register', function (req, res) {
    res.render('register.ejs');
});

app.post('/register', async (req, res) => {
    try {
        const username = req.body.username;
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new logindata({
            username: username,
            password: hashPassword,
        });
        newUser.save();
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
});


app.get('/ExternallyFundedProject', async (req, res) => {
    // Check if user is authenticated
    if (req.isAuthenticated() && req.user && req.user.username) {
        const username = req.user.username.substring(0, req.user.username.indexOf('@'));
        const Principal = req.user.Principal;
        const CropEXT = req.user.CropEXT;
        const ResearchEXT = req.user.ResearchEXT;
        const ObjectivesEXT = req.user.ObjectivesEXT;
        const executionEXT = req.user.executionEXT;
        const DurationEXT = req.user.DurationEXT;
        const TreatmentEXT = req.user.TreatmentEXT;
        const TreatmentDetailsEXT = req.user.TreatmentDetailsEXT;
        const R1EXT = req.user.R1EXT;
        const R2EXT = req.user.R2EXT;
        const R3EXT = req.user.R3EXT;
        try {
            res.render("ExternallyFundedProject.ejs", {
                username: username,
                Principal: Principal,
                CropEXT: CropEXT,
                ResearchEXT: ResearchEXT,
                ObjectivesEXT: ObjectivesEXT,
                executionEXT: executionEXT,
                DurationEXT: DurationEXT,
                TreatmentEXT: TreatmentEXT,
                TreatmentDetailsEXT: TreatmentDetailsEXT,
                R1EXT: R1EXT,
                R2EXT: R2EXT,
                R3EXT: R3EXT,
                sourcePage: "extproject",
            });

        } catch (err) {
            console.error("Error fetching skill items:", err);
            res.redirect('/login');
        }
        
    } else {
        res.redirect('/login');
    }
});
app.post('/ExternallyFundedProject', async function (req, res) {
    if (req.isAuthenticated() && req.user && req.user.username) {
        const Principal = req.body.Principal;
        const CropEXT = req.body.CropEXT;
        const ResearchEXT = req.body.ResearchEXT;
        const ObjectivesEXT = req.body.ObjectivesEXT;
        const executionEXT = req.body.executionEXT;
        const DurationEXT = req.body.DurationEXT;
        const TreatmentEXT = req.body.TreatmentEXT;
        const TreatmentDetailsEXT = req.body.TreatmentDetailsEXT;
        const R1EXT = req.body.R1EXT;
        const R2EXT = req.body.R2EXT;
        const R3EXT = req.body.R3EXT;
        try {
            await logindata.updateMany(
                { username: req.user.username },
                {
                    $set: {
                        Principal: Principal, 
                        CropEXT: CropEXT, 
                        ResearchEXT: ResearchEXT, 
                        ObjectivesEXT: ObjectivesEXT, 
                        executionEXT: executionEXT, 
                        DurationEXT: DurationEXT, 
                        TreatmentEXT: TreatmentEXT,
                    },
                    $push: {
                        TreatmentDetailsEXT: TreatmentDetailsEXT,
                        R1EXT: R1EXT,
                        R2EXT: R2EXT,
                        R3EXT: R3EXT,
                        } 
                        
                    }
                
                );
              res.redirect("/ExternallyFundedProject")
        } catch (error) {
            console.error('Error updating favorite game:', error);
            res.redirect('/ExternallyFundedProject'); // Handle error by redirecting back to profile page
        }
    } else {
        res.redirect('/login');
    }
});

// app.post('/login', (req, res, next) => {
//     const studentExperiment = req.body.StudentExperiment;
//     req.session.studentExperiment = studentExperiment;
//     array = studentExperiment;
//     passport.authenticate('local', {
//         successRedirect: '/redirect',
//         failureRedirect: '/login',
//         failureFlash: true,
//     })(req, res, next); // Call passport.authenticate immediately
// });

app.post('/login', (req, res, next) => {
    const studentExperiment = req.body.StudentExperiment;
    req.session.studentExperiment = studentExperiment;
    array = studentExperiment;

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }

        if (!user) {
            return res.redirect('/login'); // Handle incorrect credentials
        }

        if (!user.verified) {
            return res.redirect('/login?error=notverified'); // Redirect to login with an error message
        }

        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.redirect('/redirect');
        });
    })(req, res, next);
});




app.get('/redirect', (req, res) => {
    req.session.studentExperiment = null;
    req.session.array = null;

    if (array === "RCM Project") {
        console.log("Redirecting to RCMProject");
        res.redirect('/RCMProject');
    } else if (array === "Externally Funded Project") {
        console.log("Redirecting to ExternallyFundedProject");
        res.redirect('/ExternallyFundedProject');
    } else {
        console.log("Redirecting to profile");
        res.redirect('/profile'); // Default to profile page
    }
});
app.get('/RCMProject', async (req, res) => {
    // Check if user is authenticated
    if (req.isAuthenticated() && req.user && req.user.username) {
        const username = req.user.username.substring(0, req.user.username.indexOf('@'));
        const Faculty = req.user.Faculty;
        const CropRCM = req.user.CropRCM;
        const ResearchRCM = req.user.ResearchRCM;
        const ObjectivesRCM = req.user.ObjectivesRCM;
        const executionRCM = req.user.executionRCM;
        const DurationRCM = req.user.DurationRCM;
        const TreatmentRCM = req.user.TreatmentRCM;
        const TreatmentDetailsRCM = req.user.TreatmentDetailsRCM;
        const R1RCM = req.user.R1RCM;
        const R2RCM = req.user.R2RCM;
        const R3RCM = req.user.R3RCM;
        try {
            res.render("RCMProject.ejs", {
                username: username,
                Faculty: Faculty,
                CropRCM: CropRCM,
                ResearchRCM: ResearchRCM,
                ObjectivesRCM: ObjectivesRCM,
                executionRCM: executionRCM,
                DurationRCM: DurationRCM,
                TreatmentRCM: TreatmentRCM,
                TreatmentDetailsRCM: TreatmentDetailsRCM,
                R1RCM: R1RCM,
                R2RCM: R2RCM,
                R3RCM: R3RCM,
                sourcePage: "rcmproject",
            });

        } catch (err) {
            console.error("Error fetching skill items:", err);
            res.redirect('/login');
        }
        
    } else {
        res.redirect('/login');
    }
});

app.post('/RCMProject', async function (req, res) {
    if (req.isAuthenticated() && req.user && req.user.username) {
        const Faculty = req.body.Faculty;
        const CropRCM = req.body.CropRCM;
        const ResearchRCM = req.body.ResearchRCM;
        const ObjectivesRCM = req.body.ObjectivesRCM;
        const executionRCM = req.body.executionRCM;
        const DurationRCM = req.body.DurationRCM;
        const TreatmentRCM = req.body.TreatmentRCM;
        const TreatmentDetailsRCM = req.body.TreatmentDetailsRCM;
        const R1RCM = req.body.R1RCM;
        const R2RCM = req.body.R2RCM;
        const R3RCM = req.body.R3RCM;
        try {
            await logindata.updateMany(
                { username: req.user.username },
                {
                    $set: {
                        Faculty: Faculty, 
                        CropRCM: CropRCM, 
                        ResearchRCM: ResearchRCM, 
                        ObjectivesRCM: ObjectivesRCM, 
                        executionRCM: executionRCM, 
                        DurationRCM: DurationRCM, 
                        TreatmentRCM: TreatmentRCM,
                    },
                    $push: {
                        TreatmentDetailsRCM: TreatmentDetailsRCM,
                        R1RCM: R1RCM,
                        R2RCM: R2RCM,
                        R3RCM: R3RCM,
                        } 
                        
                    }
                
                );
              res.redirect("/RCMProject")
        } catch (error) {
            console.error('Error updating favorite game:', error);
            res.redirect('/RCMProject'); // Handle error by redirecting back to profile page
        }
    } else {
        res.redirect('/login');
    }
});
app.get('/profile', async function (req, res) {
    
    if (req.isAuthenticated() && req.user && req.user.username) {
        const username = req.user.username.substring(0, req.user.username.indexOf('@'));
        const Advisor = req.user.Advisor;
        const Crop = req.user.Crop;
        const Research = req.user.Research;
        const Experiment1Year = req.user.Experiment1Year;
        const Experiment1Duration = req.user.Experiment1Duration;
        const Experiment1Treatment = req.user.Experiment1Treatment;
        const Experiment1Data = req.user.Experiment1Data;
        const Experiment2Year = req.user.Experiment2Year;
        const Experiment2Duration = req.user.Experiment2Duration;
        const Experiment2Treatment = req.user.Experiment2Treatment;
        const Experiment2Data = req.user.Experiment2Data;
        const Experiment3Year = req.user.Experiment3Year;
        const Experiment3Duration = req.user.Experiment3Duration;
        const Experiment3Treatment = req.user.Experiment3Treatment;
        const Experiment3Data = req.user.Experiment3Data;
        const Experiment4Year = req.user.Experiment4Year;
        const Experiment4Duration = req.user.Experiment4Duration;
        const Experiment4Treatment = req.user.Experiment4Treatment;
        const Experiment4Data = req.user.Experiment4Data;
        const Year = req.user.Year;
        const Duration = req.user.Duration;
        const Treatment = req.user.Treatment;
        const TreatmentDetails = req.user.TreatmentDetails;
        const R1 = req.user.R1;
        const R2 = req.user.R2;
        const R3 = req.user.R3;
        try {
            res.render("profile.ejs", {
                username: username,
                Advisor: Advisor,
                Crop: Crop,
                Research: Research,
                Experiment1Year: Experiment1Year,
                Experiment1Duration: Experiment1Duration,
                Experiment1Treatment: Experiment1Treatment,
                Experiment1Data: Experiment1Data,
                Experiment2Year: Experiment2Year,
                Experiment2Duration: Experiment2Duration,
                Experiment2Treatment: Experiment2Treatment,
                Experiment2Data: Experiment2Data,
                Experiment3Year: Experiment3Year,
                Experiment3Duration: Experiment3Duration,
                Experiment3Treatment: Experiment3Treatment,
                Experiment3Data: Experiment3Data,
                Experiment4Year: Experiment4Year,
                Experiment4Duration: Experiment4Duration,
                Experiment4Treatment: Experiment4Treatment,
                Experiment4Data: Experiment4Data,
                Year: Year,
                Duration: Duration,
                Treatment: Treatment,
                TreatmentDetails: TreatmentDetails,
                R1: R1,
                R2: R2,
                R3: R3,
                sourcePage: "profile",
            });
        } catch (err) {
            console.error("Error fetching skill items:", err);
            res.redirect('/login');
        }
        
    } else {
        res.redirect('/login');
    }
});





app.post('/profile', async function (req, res) {
    if (req.isAuthenticated() && req.user && req.user.username) {
        const Advisor = req.body.Advisor; // Get new favorite game from form
        const Crop = req.body.Crop;
        const Research = req.body.Research;
        const Experiment1Year = req.body.Experiment1Year;
        const Experiment1Duration = req.body.Experiment1Duration;
        const Experiment1Treatment = req.body.Experiment1Treatment;
        const Experiment1Data = req.body.Experiment1Data;
        const Experiment2Year = req.body.Experiment2Year;
        const Experiment2Duration = req.body.Experiment2Duration;
        const Experiment2Treatment = req.body.Experiment2Treatment;
        const Experiment2Data = req.body.Experiment2Data;
        const Experiment3Year = req.body.Experiment3Year;
        const Experiment3Duration = req.body.Experiment3Duration;
        const Experiment3Treatment = req.body.Experiment3Treatment;
        const Experiment3Data = req.body.Experiment3Data;
        const Experiment4Year = req.body.Experiment4Year;
        const Experiment4Duration = req.body.Experiment4Duration;
        const Experiment4Treatment = req.body.Experiment4Treatment;
        const Experiment4Data = req.body.Experiment4Data;
        const Year = req.body.Year;
        const Duration = req.body.Duration;
        const Treatment = req.body.Treatment;
        const TreatmentDetails = req.body.TreatmentDetails;
        const R1 = req.body.R1;
        const R2 = req.body.R2;
        const R3 = req.body.R3;
        try {
            await logindata.updateMany(
                { username: req.user.username },
                {
                    $set: {
                        Advisor: Advisor,
                        Crop: Crop,
                        Research: Research,
                        Experiment1Year: Experiment1Year,
                        Experiment1Duration: Experiment1Duration,
                        Experiment1Treatment: Experiment1Treatment,
                        Experiment1Data: Experiment1Data,
                        Experiment2Year: Experiment2Year,
                        Experiment2Duration: Experiment2Duration,
                        Experiment2Treatment: Experiment2Treatment,
                        Experiment2Data: Experiment2Data,
                        Experiment3Year: Experiment3Year,
                        Experiment3Duration: Experiment3Duration,
                        Experiment3Treatment: Experiment3Treatment,
                        Experiment3Data: Experiment3Data,
                        Experiment4Year: Experiment4Year,
                        Experiment4Duration: Experiment4Duration,
                        Experiment4Treatment: Experiment4Treatment,
                        Experiment4Data: Experiment4Data,
                        Year: Year,
                        Duration: Duration,
                        Treatment: Treatment   
                    },
                    $push: {
                        TreatmentDetails: TreatmentDetails,
                        R1: R1,
                        R2: R2,
                        R3: R3,
                    }
                }
                );
            
              res.redirect("/profile")
        } catch (error) {
            console.error('Error updating favorite game:', error);
            res.redirect('/profile'); // Handle error by redirecting back to profile page
        }
    } else {
        res.redirect('/login');
    }
});

app.post('/delete', async function (req, res) {
    if (req.isAuthenticated() && req.user && req.user.username) {
        const rowIndexWithPage = req.body.rowIndex; // Get the value of the hidden field

        const [rowIndex, sourcePage] = rowIndexWithPage.split('_');
        const user = req.user;

        try {
            const updatedTreatmentDetails = user.TreatmentDetails.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR1 = user.R1.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR2 = user.R2.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR3 = user.R3.filter((_, index) => index !== parseInt(rowIndex));
            const updatedTreatmentDetailsRCM = user.TreatmentDetailsRCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR1RCM = user.R1RCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR2RCM = user.R2RCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR3RCM = user.R3RCM.filter((_, index) => index !== parseInt(rowIndex));
            const updatedTreatmentDetailsEXT = user.TreatmentDetailsEXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR1EXT = user.R1EXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR2EXT = user.R2EXT.filter((_, index) => index !== parseInt(rowIndex));
            const updatedR3EXT = user.R3EXT.filter((_, index) => index !== parseInt(rowIndex));

            let redirectUrl = "/profile"; // Default to profile page
            if (sourcePage === "rcmproject") {
                redirectUrl = "/RCMProject";
            }
            else if (sourcePage === "extproject") {
                redirectUrl = "/ExternallyFundedProject";
            }


            await logindata.findByIdAndUpdate(
                user._id,
                {
                    TreatmentDetails: updatedTreatmentDetails,
                    R1: updatedR1,
                    R2: updatedR2,
                    R3: updatedR3,
                    TreatmentDetailsRCM: updatedTreatmentDetailsRCM,
                    R1RCM: updatedR1RCM,
                    R2RCM: updatedR2RCM,
                    R3RCM: updatedR3RCM,
                    TreatmentDetailsEXT: updatedTreatmentDetailsEXT,
                    R1EXT: updatedR1EXT,
                    R2EXT: updatedR2EXT,
                    R3EXT: updatedR3EXT,
                }
            );

            res.redirect(redirectUrl);
        } catch (error) {
            console.error('Error deleting row:', error);
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
});


app.post('/upload', upload.single('file'), async (req, res) => {
    if (req.isAuthenticated() && req.user && req.user.username) {
        const username = req.user.username;
        const sourcePage = req.body.sourcePage;
        try {
            // Update the user document to store the file information
            await logindata.findOneAndUpdate(
                { username: username },
                { $set: { uploadedFile: req.file } }
            );

            let redirectUrl = "/profile"; // Default to profile page
            if (sourcePage === "rcmproject") {
                redirectUrl = "/RCMProject";
            }
            else if (sourcePage === "extproject") {
                redirectUrl = "/ExternallyFundedProject";
            }
            res.redirect(redirectUrl);
        } catch (error) {
            console.error('Error uploading file:', error);
            res.redirect('/ExternallyFundedProject'); // Handle error by redirecting back to the form
        }
    } else {
        res.redirect('/login');
    }
});





app.get('/adminVerify', async (req, res) => {
        try {
            const unverifiedUsers = await logindata.find({ verified: false });
            res.render('adminVerify.ejs', { unverifiedUsers });
        } catch (error) {
            console.error('Error fetching unverified users:', error);
            res.redirect('/profile'); // Redirect to a suitable page
        }
    
});


app.post('/adminVerify/accept', async (req, res) => {
        const userId = req.body.userId;
        try {
            await logindata.findByIdAndUpdate(userId, { verified: true });
            res.redirect('/adminVerify');
        } catch (error) {
            console.error('Error accepting user:', error);
            res.redirect('/adminVerify');
        }
});

app.post('/adminVerify/decline', async (req, res) => {
        const userId = req.body.userId;
        try {
            await logindata.findByIdAndDelete(userId);
            res.redirect('/adminVerify');
        } catch (error) {
            console.error('Error declining user:', error);
            res.redirect('/adminVerify');
        }
});





app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



    app.listen(3000);