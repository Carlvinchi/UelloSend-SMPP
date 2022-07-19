 /*
 var data = {
    command_length: 156,
    command_id: 5,
    command_status: 0,
    sequence_number: 18253989,
    command: 'deliver_sm',
    service_type: '',
    source_addr_ton: 0,
    source_addr_npi: 0,
    source_addr: '233543524033',
    dest_addr_ton: 0,
    dest_addr_npi: 0,
    destination_addr: 'UelloSend',
    esm_class: 4,
    protocol_id: 0,
    priority_flag: 0,
    schedule_delivery_time: '',
    validity_period: '',
    registered_delivery: 0,
    replace_if_present_flag: 0,
    data_coding: 0,
    sm_default_msg_id: 0,
    short_message: {
      message: 'id:2182911133 sub:001 dlvrd:001 submit date:2204041635 done date:2204041635 stat:DELIVRD err:000 text:'
    }
  }
  var  myString = data.short_message.message.split(' ');
  console.log(myString);
 
  
 
  var message_id = myString[0].split(':')[1];
  var submit_date = myString[4].split(':')[1];
  var done_date = myString[6].split(':')[1];
  var delivery_status = myString[7].split(':')[1];
  var error_code = myString[8].split(':')[1];



  var payload = {
    message_id: message_id,
    recipient: data.source_addr,
    sender_id:data.destination_addr,
    submit_date: submit_date,
    done_date: done_date,
    delivery_status: delivery_status,
    error_code: error_code
  }
  



 console.log(message_id);
 console.log(submit_date);
 console.log(done_date);
 console.log(delivery_status);
 console.log(error_code);
 */

      // var today = new Date("2022-04-28") ;
      // console.log(today);
      // today.setDate(today.getDate() - 90);
      // var dd = today.getDate();
      
      // var mm = today.getMonth()+1; 
      // var yyyy = today.getFullYear();
      // if(dd<10) 
      // {
      //     dd='0'+dd;
      // } 
      
      // if(mm<10) 
      // {
      //     mm='0'+mm;
      // } 
      
      // today = yyyy+'-'+mm+'-'+dd;
      // console.log(today);

      // function delay(ms) {
      //   return new Promise(resolve => setTimeout(resolve, ms));
      // }

      // async function demo() {
      //   console.log("This is a");
      //   await delay(1000);
      //   console.log("LinuxHint");
      //   await delay(1000);
      //   console.log("Tutorial!");
      // }
      // demo();

      //220608155501+
      //yymmddhhmmss+
      var d = "30-04-2022 08:51 PM";
      
  //     function dateProcessor(my_date_time) {

  //       var time = my_date_time.substr(-8,8); // extract the time portion of the date
        
  //       var hours = parseInt(time.substr(0, 2)); // extract the hours part of the time
  //       if(time.indexOf('AM') != -1 && hours == 12) {
  //           time = time.replace('12', '00');
  //       }
  //       if(time.indexOf('PM')  != -1 && hours < 12) {
  //           time = time.replace(hours, (hours + 12));
  //       }
  //       time = time.replace(/(AM|PM)/, '');
        
  //       var my_date =  my_date_time.substr(0,10); // extract the date part of the datetime object
        
  //       my_date = my_date.split("-").reverse().join("-"); // split and reverse the date and then join 
        
  //       var final_date_time = my_date+' '+time;
        
  //       var my_new_date = new Date(final_date_time);
  //       var get_milliseconds = my_new_date.getTime();

  //       var current_date = Date.now();
        
  //       var ms_seconds = get_milliseconds -current_date;
  //       return ms_seconds;
  //   }

  //  dateProcessor(d);
        //220608155501+
       //yymmddhhmmss+
       var d = "19-07-2022 12:10 PM";

    async  function dateProcessor(my_date_time) {

        var time = my_date_time.substr(-8,8); // extract the time portion of the date
        
        var hours = parseInt(time.substr(0, 2)); // extract the hours part of the time
        if(time.indexOf('AM') != -1 && hours == 12) {
            time = time.replace('12', '00');
        }
        if(time.indexOf('PM')  != -1 && hours < 12) {

          if(time.startsWith('0')){
            time = time.slice(1);
          }
            time = time.replace(hours, (hours + 12));
        }
        time = time.replace(/(AM|PM)/, '');
        
        var my_date =  my_date_time.substr(0,10); // extract the date part of the datetime object

       
        
        my_date = my_date.split("-").reverse().join("-"); // split and reverse the date and then join 
        console.log('this is date '+my_date);
        console.log('this is time '+time);

        my_date = my_date.split('-').join('');
        my_date = my_date.slice(2);

        time = time.split(':').join('');
        time = time+"01+";
        time = time.split(' ').join(''); 


        console.log('this is smpp date '+my_date);
        console.log('this is smpp time '+time);


        var final_date_time = my_date+''+time;
        final_date_time = final_date_time.trim();
        console.log('this is final date '+final_date_time);
        
        return final_date_time;
    }

    dateProcessor(d);
