//to run use the command
//node relative\path\to\nodemailtest.js 
//(likely src\app\nodemailtest.js)

//set up nodemailer server
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "raebgub@gmail.com",
		pass: "vesu cnld yjly puuw"
	}
});

//actual email
const mailOptions = {
	from: "raebgub@gmail.com",
	to: "june@watson-net.com",
	subject: "Nodemailer Test",
	text: "It works :3c"
};

//send it, display error messages, etc.
transporter.sendMail(mailOptions, function(error, info){
	if(error){
		console.log(error);
	}else{
		console.log("email sent");
	}
});