<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-green-800 min-h-screen text-white">
        <!-- Header -->
        <Header/>

        <!-- Banner -->
        <div
          class="relative bg-cover bg-center text-center py-20 "
          style="background-image: url('/src/assets/Wallpapper_4.png')"
        >
          <h2 class="text-2xl font-bold">SHOW YOUR SKILLS</h2>
          <p class="text-lg">PLAY AND WIN!</p>
          <p class="text-yellow-500 text-3xl mt-4">Jackpot 1 500 000 ₹</p>
        </div>

        <!-- Data Protection Policy Section -->
        <section class="p-4 flex justify-center">
          <div class="bg-white text-black rounded-lg p-6 lg:w-1/2 w-full">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold">DATA PROTECTION POLICY</h3>
              <q-icon name="close" class="cursor-pointer" />
            </div>
            <div class="overflow-y-auto max-h-64">
              <p  class="text-gray-800 mb-2">
               Casino-of-Hinduism.com will protect your personal data and must comply with legal requirements. With this Privacy Policy ("Policy"), we will show you how we use your personal data and how we protect it. Personal data in the sense of this Policy refers to any data we receive in connection with your use of Casino-of-Hinduism.com and which can be used to directly or indirectly identify you, such as name, address, date of birth, gender, phone number, account details, and transaction data. We expect you to read this Policy before using Casino-of-Hinduism.com. By using Casino-of-Hinduism.com, you accept this Policy. This Policy contains the following sections: Responsible for data processing, What are the legal grounds for this Policy? What types of personal data do we collect and process? For what purposes are your personal data processed? How long will your personal data be retained? Security and privacy measures, Who can access your personal data? Is personal data shared with third parties? What rights do you have regarding your personal data? Cookies, Changes to the Policy, What types of personal data do we collect and process. Depending on your activities and the services you select on the website/in the apps, we process the following data either partially or entirely. The data you provide when setting up your player account, including name, date of birth, nationality, gender, residence, email address, phone number, password with security question and answer, ID copy;The activity data generated during your use of Casino-of-Hinduism.com, including device data such as IP address, source and destination data, player ID, game transactions, data related to online payment methods (debit/credit cards, bank accounts, postal accounts), website login history, analytical information, data provided to customer service (including emails, chats, and calls); Data provided to us by authorities or authorized third parties (for example, in connection with identity checks, money transfers, or game bans) to fulfill legal obligations and exercise our rights; Data collected using cookies during your use of Casino-of-Hinduism.com, which is not entirely anonymous but is linked or associated with personal data. For more information on cookies and how to manage them, please refer to our Cookie Policy. For what purposes are your personal data processed? We process your data for the following purposes: Operation and management of Casino-of-Hinduism.com, including the setup and maintenance of your player account; Verification of the data you provided during the setup of your player account and for money transfers; Compliance with laws and regulatory obligations, including responding to inquiries from authorities; Fulfillment of our contractual obligations to players in accordance with legal requirements and the Terms and Conditions (T&C); Processing of money transfers using third-party payment service providers and financial institutions; Protection of our rights, including the rights of our suppliers and other contractual partners; Provision of customer support. Calls may be recorded for security reasons, regulatory compliance, and service improvement; Improvement of security, services, and features of Casino-of-Hinduism.com. This may include research, surveys, requests for your voluntary feedback, internal training, and services from partners; Sending marketing communications subject to your explicit consent. Such marketing communications may be based on your registration and game activity data. Who can access your personal data? Governmentcertified processes and quality management systems ensure that only those specially authorized individuals (employees of Casino-of-Hinduism.com, employees of suppliers such as platform providers and credit card companies, authorities) can access your data, and this is always limited to their respective area of responsibility and tasks. 
              </p>
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