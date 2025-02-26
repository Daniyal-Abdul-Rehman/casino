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
                <h3 class="text-xl font-bold">Responsible Gaming</h3>
                <q-icon name="close" class="cursor-pointer" />
              </div>
              <div class="overflow-y-auto max-h-64">
                <p class="text-gray-800 mb-2">
Casino-of-Hinduism.com is supposed to be fun. We don’t want fun to turn into compulsive gambling, and we place great importance on preventing gambling addiction. On this page, we have put together information 
to help you gamble responsibly. We invite you to get to know and use these opportunities for self-control and reflection on your own gambling behaviour so that you can have lots of fun while minimising risks. Do 
you have any questions about responsible gambling? You can reach us quickly and easily at gamesafe@casino-of-hinduisnm.com. Player Protection Departmen. We stand for the protection of our players. We have 
a social concept that provides you with opportunities for self-control and reflection on your own gambling behaviour. We are here for you. Player Protection Department – Who are we? We value gambling addiction 
prevention and safe, responsible gambling. That’s why Casino-of-Hinduism.com has a Player Protection Department. Our primary goal is to protect your health. We support you in this, often behind the scenes. But 
we are also here for you personally and directly. Whether you need support or simply have a question, you can reach our Player Protection Team quickly and easily at Casino-of-Hinduism.com. Try it out: what can 
we do for you? Player Protection Department – What do we do? In order to be able to verifiably exclude the possibility of a reason for suspending your account based on your financial situation or your gambling 
activity, we carry out checks (including creditworthiness checks) based on the legal provisions in the Federal Gaming Act. In order to protect you from the potential negative consequences of gambling online, we 
carefully monitor whether we see any risks in your gambling behaviour. Depending on the risk profile discovered, we carry out a corresponding clarification. We will contact you in this case. This is common practice 
for all india online casinos. It is possible that we will request various kinds of proof from you: proof of income and assets, extract from the debt collection register, bank account statements and, if applicable, tax 
documents. Our aim is to use the documentation to check whether your income and assets are in line with your stakes and/or whether you are meeting your financial obligations in order to protect yourself from the 
possible dangers of gambling. If we have concerns, we will take appropriate action to do our job of protecting our players. We are aware that we request private and confidential documents for the verification 
process. But rest assured: your data is safe with us because we work with the highest standards in data protection. Gambling addiction – Protect yourself. When you become addicted to gambling, you lose control 
of what you are doing, but you may not realise it for a long time. Learn more about the characteristics of gambling addiction and what you can do about it. The three stages of gambling addiction. When you become 
addicted to gambling, you lose control of what you are doing, but you may not realise it for a long time. So be vigilant and pay attention to the warning signs. Big wins can give the illusion that your skilful gambling 
has brought success. This thinking is dangerous because it creates unrealistic expectations for future games and you then take too many risks. Never forget that it is gambling. Anything you bet can be lost. Only 
chance decides. To recoup losses, you take out a loan or borrow money privately. You convince yourself that you can get the debt under control. But that’s also an illusion. Never gamble with borrowed money! You 
have invested a lot of time and money in gambling, and it has dominated your everyday life for a long time. Little by little, you lose family, friends, work and eventually your self-esteem. Get help! Asking for help 
shows strength, not weakness. Gamble with a clear head. Do not drink alcohol while playing. It increases your willingness to take risks. Monitor your gambling time and take regular breaks. Set sensible limits and 
never play with borrowed money. Balance your gambling by doing other activities. In your player profile under «My player protection» you will find a whole section that can support you with your personal self-control.
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