<template>
    <q-layout>
      <q-page-container>
        <q-page class="bg-green-800 min-h-screen text-white">
          <!-- Header -->
          <Header/>
  
          <!-- Banner -->
          <div
            class="relative bg-cover bg-center text-center py-20 "
            style="background-image: url('/src/assets/Wallpapper_1.jpg')"
          >
            <h2 class="text-2xl font-bold">SHOW YOUR SKILLS</h2>
            <p class="text-lg">PLAY AND WIN!</p>
            <p class="text-yellow-500 text-3xl mt-4">Jackpot 1 500 000 ₹</p>
          </div>
  
          <!-- Data Protection Policy Section -->
          <section class="p-4 flex justify-center">
            <div class="bg-white text-black rounded-lg p-6 lg:w-1/2 w-full">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold">Cookie - Policy</h3>
                <q-icon name="close" class="cursor-pointer" />
              </div>
              <div class="overflow-y-auto max-h-64">
                <p  class="text-gray-800 mb-2">
                  General Information We use cookies on this website. You have the option to set your preferences in the cookie settings dialog. This Cookie Policy (the "Policy") provides more information about cookies and how we use them. It is an integral part of our Privacy Policy. What is a Cookie? An internet cookie is a small file that contains letters and numbers. It is stored on the device used to access the internet, such as a computer, tablet, mobile phone, or other device. A cookie is created at the request of your web server (website) to your browser, such as Internet Explorer, Firefox, Chrome, etc. In general, cookies are not used to process personal data of users. Only in exceptional cases can they be used to process data that could potentially be used to indirectly identify a website user. Cookies are considered passive, as they do not contain software programs, viruses, or spyware and cannot access information on the device's hard drive. When a user revisits the website, the web server can read the previously stored cookies and respond accordingly. What Are the Benefits of Cookies? Cookies play an important role in making it easier for users to access services offered on the internet, such as ensuring the proper display or functionality of a website. Additionally, cookies provide valuable feedback to website operators regarding user behavior. This enables them to make websites more accessible and improve the navigation experience, for example, by saving use preferences related to language, shopping carts, ads, etc. What Types of Cookies Do We Use? The types of cookies used on this website can be categorized as follows. The specific cookie type used in each category is included in the cookie settings dialo. Strictly Necessary Cookies These cookies enable basic website functions and cannot be turned off. They are typically set when you request a service, such as setting your privacy preferences, logging in, or filling out forms. You can configure your browser to block these cookies or alert you when they are set, but certain parts of the website may not function properly as a result. These cookies do not store personal data. Performance Cookies. These cookies allow us to monitor the use of our website so that we can measure and improve its performance. With these cookies, we can count page views, determine which pages are popular or less popular, and understand how visitors use the website. All information is aggregated and therefore anonymous. If you decline these cookies, we will not be able to monitor the website's performance. If this website uses Google Analytics cookies, the collected information is processed by Google in accordance with Google's Privacy Policy, which you can view. Functional Cookies These cookies enable the website to provide enhanced functionalities and personalize services. These cookies can be set by us or by third parties whose services we use on our website. If you decline these cookies, some or all of these services may not function properly. Marketing Cookies These cookies can be set by our advertising partners on our website and used to create a profile of your interests to show you personalized advertisements on other sites. These cookies do not collect personal information directly but can uniquely identify your browser and internet device. If you decline these cookies, you will see fewer personalized ads. If this website contains links to external sites such as Facebook, Twitter, YouTube, Instagram, etc., this privacy policy does not cover how those external websites process personal information. We therefore recommend that you read the privacy policies of the respective websites. How Can You Control and Delete Cookies? You have the option to set your preferences on this website in the cookie settings dialog. Additionally, you can block, disable, or delete cookies via your web browser. Disabling a specific category of cookies does not automatically delete the cookies in your browser. This can only be done using the browser’s functions. Please note that after disabling or deleting certain cookies or categories of cookies, some functions and features of the website may no longer be available. Changes to the Cookie Policy We may make changes to this policy at any time if necessary for our business operations or to comply with legal requirements. The updated version of the policy will be published on the website. If you have any further questions, please contact us using the provided contact details  </p>
              </div>
            </div>
          </section>
          <Footer/>
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
    
    <script>
    import Footer from 'src/components/footer.vue';
    import Header from "../../components/header.vue"
    export default {
        components:{
            Footer,
            Header
        }
    };
    </script>
    
    <style>
    </style>