import React from 'react'

const Terms = () => {

    document.title = "Terms | Minimal Tracker";
    return (
        <div className="terms">
            <h1 className="heading-primary u-center-text">Terms and conditions</h1>
            <p className="text u-margin-bottom-small" >
                Last update: 23/12/2019 <br></br>
                You can contact the site via <a href="mailto:ignasiespinosa@gmail.com">ignasiespinosa@gmail.com</a> <br></br>
            </p>
            <h2 className="heading-secondary">
                Acceptation
            </h2>
            <p className="text u-margin-bottom-small" >
                This site is available to any user, for your own consumption and use, with the legal conditions that you will find in this 
                text. The usage of the web implies a compromise to not use it for ilicit or ilegal purposes that suppose an infraction
                of the rules.
            </p>
            <h2 className="heading-secondary">
                Storage and cookies
            </h2>
            <p className="text u-margin-bottom-small" >This site doesnt use any cookies but it makes use of the local storage of HTML to store session data, 
                by browsing this site you agree to this storage usage.
            </p>
            <h2 className="heading-secondary">Personal information</h2>
            <p className="text u-margin-bottom-small" >All the personal information posted in this website, can be deleted by using the Delete Account in the profile settings or by sending a mail to <a href="mailto:ignasiespinosa@gmail.com">ignasiespinosa@gmail.com</a> <br></br></p>
            <h2 className="heading-secondary">Age</h2>
            <p className="text u-margin-bottom-small" >You declare that are 16 years old or older and that you have the legal capability for vincluate yourself in this agreement and use the site according these rules.</p>
            <h2 className="heading-secondary">Usage of the service</h2>
            <p className="text u-margin-bottom-small" >You will use this site according to the following rules and the current legislation. <br></br>
                Abstain to:</p>
            <ul>
                <li className="text">Use the site with ilicit purposes, that harm third parties or that can harm in any way the normal usage of the services</li>
                <li className="text">Acces protected resources or areas without fullfiling the necesary conditions</li>
                <li className="text">To cause harm in the physical systems of the site, we're refering to virus or malware</li>
                <li className="text u-margin-bottom-small">Try to manipulate site's data or other user's data</li>
            </ul>
            <h2 className="heading-secondary">Intellectual property</h2>
            <p className="text u-margin-bottom-small" >
                You can use this site and its code as you please as long as you citate the author (Ignasi Espinosa).
            </p>

        </div>
    )
}

export default Terms;
