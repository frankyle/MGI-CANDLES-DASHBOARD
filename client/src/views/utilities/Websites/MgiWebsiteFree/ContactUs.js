

// ==============================|| SAMPLE PAGE ||============================== //

const ContactUs = () => (
    <div class="contact_section layout_padding">
    <div class="container">
      <h2 class=" text-uppercase mb-4">
        Contact Us
      </h2>
      <div class="row">
        <div class="col-md-6 ">
          <form action="">
            <div class="contact_form-container">
              <div>
                <div>
                  <input type="text" placeholder="Name" />
                </div>
                <div>
                  <input type="text" placeholder="Phone Number" />
                </div>
                <div>
                  <input type="email" placeholder="Email" />
                </div>

                <div class="">
                  <input type="text" class="message-input" placeholder="Message" />
                </div>
                <div class="mt-5">
                  <button type="submit">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <div class="map_container">
            <div id="map" class="h-100 w-100 "></div>
          </div>

        </div>
      </div>
    </div>
  </div>
  
);

export default ContactUs;
