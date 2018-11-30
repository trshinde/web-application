var express = require('express');
var router = express.Router();
var ctrlMain = require("../controllers/main");

/*
 * GET home page.
 */
router.get('/', ctrlMain.frontPage);

router.get('/frontPage', ctrlMain.frontPage);


router.get('/homePage', ctrlMain.home);
/*
 * GET text fields page.
 */
router.get('/aboutLink', ctrlMain.get_about);
router.get('/accountLink',ctrlMain.get_account);
/*
 * GET Subscribe page.
 */

router.get('/userlist', ctrlMain.get_userlist);

router.get('/subscribeLink', ctrlMain.get_subscribe);


router.get('/edituser', ctrlMain.get_update);

router.post('/adduser',ctrlMain.post_add_user);

router.get('/userlist/:email',ctrlMain.get_showuser);

router.get('/deleteuser/:email', ctrlMain.get_deleteuser);

router.post('/updateuser',ctrlMain.post_updateuser);

router.get('/worldMap', ctrlMain.get_worldMap);
router.get('/countryDetails', ctrlMain.get_countryDetails);
router.get('/countryForm', ctrlMain.get_countryForm);
router.get('/DevLink', ctrlMain.get_devpage);
router.get('/electricDB', ctrlMain.get_edashboard);
router.get('/communicationDB', ctrlMain.get_cdashboard);
router.get('/populationDB', ctrlMain.get_pdashboard);
/*
 * GET second Page Link.
 */
router.get('/secondPageLink', ctrlMain.get_second_page);
router.post('/secondPageLink', ctrlMain.post_second_page);
module.exports = router;