import * as React from "react";
import ContactUs1 from "../images/contactUs1.jpg";
import ContactUs2 from "../images/contactUs2.jpg";
const ContactUs = () => {
    return (
        <main role="main" className="bg-warning">
            <div className="d-flex justify-content mt-5 mx-3">

                <div className="notes mx-3">
                    <p className="font-weight-bold mt-5 mb-3">Note: </p>
                    <p className="font-weight-normal">If you have a question about a
                        specific pet or policies at a shelter, please contact them
                        directly. Asking Petfinder will delay your search for a pet,
                        since each shelter manages its own pet list and information on Petfinder.com. Read on for more answers.</p>
                    <h3 className="mt-5">Are you looking for a new pet?</h3>
                    <p className="font-weight-normal">Petfinder.com is a searchable list
                        of pets from thousands of shelters and foster groups. Begin your search
                        using our Find a pet (at the top of this page). Since Petfinder is updated
                        on a daily basis, we recommend you keep checking back or save your query so
                        we’ll send you an automatic e-mail when new pets are added that match your search.</p>
                        <img src={ContactUs2}
                        className="rounded float-end mt-5 mb-5 mx-5"
                        alt=""
                        width="500"
                        height="300"></img>
                    <h3>Do you need more information on adoption policies? (For instance: What is the adoption fee for a pet? Can you adopt out of state?)</h3>
                    <p className="font-weight-normal">Adoption policies vary greatly from shelter to shelter, so please don’t contact Petfinder.com for information specific to a local adoption group. It will slow your inquiry! Contact the shelter or placement group directly. If you are interested in a particular pet, please contact the organization that is caring for that animal. You can find their contact information just under the pet’s photo on each pet description page.
                        Adoption fees range from $5 to hundreds of dollars. Services also range greatly, from virtually none to full vaccinations, spay/neuter, and temperament testing/training. In almost all cases, the adoption fee is less than the actual cost of caring for the pet while it is sheltered. Some groups will not adopt outside their area and many will want to do a “home check” as part of the adoption process.</p>
                    <h3>Are you having trouble entering your location on Petfinder?</h3>
                    <p className="font-weight-normal">Please make sure that you are entering either your correct American zip code or Canadian postal code (including the space). If you are searching by the name of a town, please type it like Tucson, AZ (using the two letter abbreviation for the state). For example, you would type either 07978 OR Pluckemin, NJ. If your web browser is “cookie-enabled” it will remember your zip code for future visits so that you do not have to reenter it each time. If Petfinder.com doesn’t recognize your postal code, please contact us.</p>
                    <h3>Still have a question?</h3>
                    <p className="font-weight-normal">Send us E-mail to huskyAnimalGroup@gmail.com</p>
                </div>

                <div>
                    <img src={ContactUs1}
                        className="rounded float-end mt-5 mb-5"
                        alt=""
                        width="550"
                        height="400"></img>
                    <h3 className="mt-4 mb-3">Are you a shelter/placement group that needs assistance?</h3>
                    <p className="font-weight-normal">We have specially trained staff dedicated to answering questions from shelter workers and placement groups.</p>
                    <h3 className="mt-4 mb-3">Do you want more information about a pet you’ve seen on Petfinder.com?</h3>
                    <p className="font-weight-normal">Please directly contact the animal welfare organization that is caring for this pet. This information can be found on the group’s home page or under the pet’s picture on their description page. Please don’t contact Petfinder.com about individual pets. We don’t have any information other than what is posted on their page so contacting us will slow your search and time may be of the essence.</p>

                </div>
            </div>
        </main>
    );

}
export default ContactUs;