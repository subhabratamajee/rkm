import Head from "next/head";
import React, { useState,useEffect } from "react";
// import post from '../api/book'
import { useRouter } from "next/router";
import useSWR from 'swr';
// import Image from "next/image";
import { server } from '../../next.config';
import Link from 'next/link'
import styles from "../../styles/Bookform.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Form(props) {
  const router = useRouter();
  const [book_title, setBook_title] = useState("");
  const [author, setAuthor] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState();
  const [message, setMessage] = useState("");

  
    
//   const data =  fetch('../api/me');
//   // return res.json();
//  const dt =  data.json();
//  console.log(dt);
  // if (!data) return <h1>Loading...</h1>;
  // let loggedIn = false;
  // if (data.email) {
  //   loggedIn = true;
  // }
// console.log(loggedIn)
  const handlePost = async (e) => {
    e.preventDefault();
    const data = await fetch('../api/me');
    // return res.json();
   const dt = await data.json();
   console.log(dt);
    const contentType = 'application/json'
  // console.log(data.email)
    // reset error and message
    setError("");
    setMessage("");

    // fields check
    // if (!book_title || !author || !contact)
    //   return setError("All fields are required");

    // if (formValidate) return setError({errs});

    let bookreq = {
      userId:dt.userId,
      name:dt.name,
      session:dt.session,
      book_title,
      author,
      contact,
    };
    let response = await fetch("../api/book/book", {
      method: "POST",
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body: JSON.stringify(bookreq),
    });

    let dataa = await response.json();

    if (dataa.success) {
      // reset the fields
      setBook_title("");
      setAuthor("");
      setContact("");

      // setMessage(dataa.message);
      toast.success(dataa.message)
      setTimeout(() => {
        router.push("./availablebooks");

      }, 1000);
    } else {
      // set the error
      return toast.error(dataa.message);
      // setError(dataa.message);
      
    }
  };

  //   setErrors({ errs });

  // const formValidate = () => {
  //   let err = {}
  //   if (!name) err.name = 'Name is required'
  //   if (!roll) err.roll = 'Roll No is required'
  //   if (!email) err.email = 'Email is required'
  //   if (!contact) err.contact = 'Contact is required'
  // if (!year) err.year = 'Year is required'
  // if (!book) err.book = 'Book Name is required'
  //   return err
  // }
  // const errs = formValidate()
  // if (Object.keys(errs).length !=0) {

  //   setError({ errs })
  // }

  // {Object.keys(error).map((err, index) => (
  //   <li key={index}>{err}</li>
  //         ))}

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Required Books Form</title>
      </Head>
      <div  >
        <ToastContainer/>
        <div className="body">
          <Link href="./availablebooks">
          <button className="btn"  style={{width:`90vw`,marginLeft:`5vw`}}><a>Requesting  Books</a></button></Link>
        
        {/* {!dt ? ( */}
        <div className="container">
          <h2>Book Submittng</h2>
          <form onSubmit={handlePost} className={styles.form}>
            {error ? (
              <div className={styles.formItem}>
                <h3 className={styles.error}> {error}</h3>
              </div>
            ) : null}
            {message ? (
              <div className={styles.formItem}>
                <h3 className={styles.message}>{message}</h3>
              </div>
            ) : null}
            <input className="form-control" placeholder="Book Title"
              type="text"
              required={true}
              name="book_title"
              value={book_title}
              onChange={(e) => setBook_title(e.target.value)}
            />
            <br />
            <input className="form-control" placeholder="Author"
              type="text"
              required={true}
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <br />
           
  
            <input className="form-control"
            placeholder="Contact Number"
              type="text"
              required={true}
              name="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <button className="btn" type="submit">Request Book</button>
            <br />
          </form>
        </div>
        </div>
       {/* ) : (
          <h1>please login to post</h1>
             )    } */}
          </div>
    </>
  );
}

export default Form;

// export async function getServerSideProps() {
//   const data = await fetch(`${server}/api/me`);
//   // return res.json();
//  const dt = await data.json();
//   // if (!data) return <h1>Loading...</h1>;
//   // let loggedIn = false;
//   // if (data.email) {
//   //   loggedIn = true;
//   // }
//   profile =dt.userId;
//   return {
//         props: {
//           baseApiUrl,
//           profile,
//         },
//       };
// }

