'use client'
import React, { useContext , useEffect} from 'react';

import { MdCheck } from 'react-icons/md';
import './pricing.css'
import Navbar from '../navbar/Navbar';
import Faq from '../faq/faq';
import { Context } from '../context/context';
function Pricing (){

    const { title ,  name , message , dispatch} = useContext(Context);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const payerCheck = ()=>{
        if(name){
            window.location.href = '/checkout-day';
        }
        else{
            window.location.href = '/sginUp';
        }
    }
    const monthSub = ()=>{
        if(name){
            window.location.href = '/checkout-monthly';
        }
        else{
            window.location.href = '/sginUp';
        }
}

    const yearSub = ()=>{
        if(name){
            window.location.href = '/checkout-yearly';

        }
        else{
            window.location.href = '/sginUp';

        }

}


useEffect(() => {
    if (title && message) {
        const timer = setTimeout(() => {
            dispatch({ type: "NO_MESSAGE" });
        }, 15 * 60 * 1000); // 15 minutes

        return () => clearTimeout(timer); // Cleanup on unmount
    }
}, [title, message, dispatch]);


// useEffect(()=>{
//     if (title && message) {
//         axios.post(`${apiUrl}/largefiles`, { title });
//     }
// },[])

return(




<div className=''>

<Navbar/>

<h1 className='title_price'>Convert more for less</h1>

<p className='description-price'  >Quickly convert large files in blazing fast speeds.</p>


{
    title && message && (
        <div className="message-container">
<p className="error-message">{title}</p>
<p className='file-limit' dangerouslySetInnerHTML={{ __html:message }} />
    </div>
    )
}


<div className="pricing">
    



    <div className="pricing_card">
            <h2 className="pricing_card_title">Daily</h2>
            <del className="fack_price">$7</del>
            <h2 className="real_price">$2.99</h2>
            <p className="price_describe">pay for a day</p>
            <button className="price_button" onClick={payerCheck}>get started</button>
            <div className="price_features">
                <MdCheck className='price_icon'/> Unlimited file size
            </div>
            <div className="price_features">
                <MdCheck className='price_icon'/> Unlimited concurrent conversions
            </div>
            <div className="price_features">
                <MdCheck className='price_icon'/> Unlimited concurrent compressions
            </div>
            <div className="price_features">
                <MdCheck className='price_icon'/> High priority
            </div>
            <div className="price_features">
                <MdCheck className='price_icon'/> No Ads
            </div>
        </div>











        <div className="pricing_card">
            <h2 className="pricing_card_title">Monthly</h2>
            <del className="fack_price">$18</del>
            <h2 className="real_price">$9.99</h2>
            <p className="price_describe">month/(cancel any time)</p>
            <button className="price_button" onClick={monthSub}>get started</button>
            <div className="price_features">
                <MdCheck className='price_icon'/> Unlimited file size
            </div>
            <div className="price_features">
                <MdCheck className='price_icon'/> Unlimited concurrent conversions
            </div>
            <div className="price_features">
                <MdCheck className='price_icon'/> Unlimited concurrent compressions
            </div>
            <div className="price_features">
                <MdCheck className='price_icon'/> High priority
            </div>
            <div className="price_features">
                <MdCheck className='price_icon'/> No Ads
            </div>
        </div>
















        <div className="pricing_card">
            <h2 className="pricing_card_title">Yearly</h2>
            <del className="fack_price">$160</del>
            <h2 className="real_price">$79.99</h2>
            <p className="price_describe">Year/(cancel any time)</p>
            <button className="price_button" onClick={yearSub}>get started</button>
            <div className="price_features">
                <MdCheck className='price_icon'/> Unlimited file size
            </div>
            <div className="price_features">
                <MdCheck className='price_icon'/> Unlimited concurrent conversions
            </div>
            <div className="price_features">
                <MdCheck className='price_icon'/> Unlimited concurrent compressions
            </div>
            <div className="price_features">
                <MdCheck className='price_icon'/> High priority
            </div>
            <div className="price_features">
                <MdCheck className='price_icon'/> No Ads
            </div>
        </div>













    </div>

<Faq/>

</div>

 
)
}

export default Pricing
