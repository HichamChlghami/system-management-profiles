"use client"

import React, { useEffect,useState } from 'react';
// import { FaFacebook } from 'react-icons/fa';
import './faq.css'
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

function Faq() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      // Simulate a 3-second delay before setting isLoading to false
      const timer = setTimeout(() => {
        setIsLoading(false);
      });
  
      return () => {
        clearTimeout(timer);
      };
    }, []);

    const [select , setSlect]= useState(false)
    const toggle =(i)=>{
        if(select === i){
          return  setSlect(false)
        }
        
       return    setSlect(i)
        
    }
    const data = [
        {
            "question":' Can I cancel my subscription at any time?' ,
            "answer":'<p>Yes, you can cancel your subscription at any time. However, refunds are not provided for the remaining days on monthly or yearly subscriptions.</p>'
        },  {
          "question":'Are there any additional charges for large files?' ,
          "answer":'<p>No, all our plans allow unlimited file sizes for conversions and compressions, with no hidden fees.</p>'
      }, 
      {
        "question":'What happens if I exceed the usage limit in a Daily plan?' ,
        "answer":'The Daily plan offers unlimited conversions for 24 hours. Once the time expires, you’ll need to purchase another Daily plan or consider upgrading to a Monthly or Yearly plan for ongoing usage.'
    }, 
    {
      "question":'Can I upgrade or downgrade my plan?' ,
      "answer":'Absolutely! You can easily upgrade or downgrade between plans through your account settings. The change will be applied at the end of your current billing cycle.'
  }, 
  {
    "question":'Do you offer refunds?' ,
    "answer":'We do not offer refunds for unused time on Monthly or Yearly plans. However, you can cancel your subscription at any time, and it will remain active until the end of the billing period.'
}, 


         ]
  return (

 


            
      <div className='faq' id='FAQs'>



<div className="according-title">Frequently Asked Questions</div>





<div className="according">
{
data.map((item ,i ) =>{
    return(

<div className="item">
<div className="title-item" onClick={()=>toggle(i)}>
<div className="title-faq">{item.question}</div>
<div className="icons-item"> {select === i ? <MdExpandLess/> : <MdExpandMore/>}</div>
</div>

<div className={select === i ? 'show':'item-content'} dangerouslySetInnerHTML={{ __html: item.answer }} />

</div>
)
})
}

</div>
</div>
   
   

  )
 

}

export default Faq