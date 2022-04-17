import React, { useState, useEffect } from "react";
// import d from '../../public/bookbg'
import styles from "../../styles/Bookform.module.css";
import dbConnect from "../../lib/mongodb";
import Books from "../../models/Books";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import User from "../../models/User";
function Availablebooks({ books }) {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({});
  const [userid, setUserid] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/`);
      setUser(res.data);
    };
  });

  return (
    <div>
     
      <ToastContainer />
      {/* {console.log(user)}  */}
      <div className={styles.body} style={{paddingTop:`20vh`}}>
        
        <h1 align="center">
          {" "}
          RAMKRISHNA MAHATO GOVERNMENT ENGINEERING COLLEGE
        </h1>
        <h2 align="center">WELCOME TO OUR LIBRARY!</h2>
        <h3 align="center">A BOOK IS A DREAM THAT YOU HOLD IN YOUR HAND</h3>

        <div>
          <input
            className="form-control" style={{width:`90vw`}}
            type="text"
            placeholder="search..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <table className="table">
            <thead>
              {/* <caption>Available Books</caption> */}
              <tr>
                <th>Book Title</th>
                <th>Auther</th>
                <th>Contact No</th>
                <th>Name</th>
                <th>Session</th>
              </tr>
            </thead>

            {books
              .filter((book) => {
                if (search == "") {
                  return book;
                } else if (
                  book.book_title
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase()) ||
                  book.author
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase()) ||
                  // book.contact.includes(search) ||
                  book.name
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase()) ||
                  book.session
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase())
                ) {
                  return book;
                }
                // else if(search!=book.book.toLowerCase().includes(search.toLocaleLowerCase())){
                //   return <h1>Search term not found</h1>
                // }
              })

              .map((book) => {
                return (
                  book.isShow === true && (
                    <>
                      <tbody>
                        <tr key={book._id}>
                          <td data-lebel="Book">{book.book_title}</td>
                          <td data-lebel="author"> {book.author}</td>
                          <td data-lebel="contact">{book.contact}</td>
                          <td data-lebel="name">{book.name}</td>
                          <td data-lebel="session">{book.session}</td>
                        </tr>
                      </tbody>

                      {/* <div>
                        <h2>Book Name : </h2>
                        <h4>Name : </h4>
                        <p>Contact No : </p>
                        <hr />
                      </div> */}
                      {/* while ({5>9}) {
                        
                      setUserid(book.userId)
                      } */}
                    </>
                  )
                );
              })}
          </table>
        </div>
      </div>
      <style jsx>{`
        h1 {
          color: blue;
        }
        h2 {
          color: blueviolet;
        }
        h3 {
          color: green;
        }
        h1 {
          font-style: oblique;
        }
        h2 {
          font-style: initial;
        }
        h3 {
          font-style: italic;
          font-size: 25px;
        }
        h4 {
          color: red;
        }
        p {
          color: green;
        }
        li {
          diaplay: inline-block;
          list-style: none;
        }
      `}</style>
    </div>
  );
}
export default Availablebooks;

export async function getServerSideProps(params) {
  const { db } = await dbConnect();
  const books = await Books.find({}).lean();
  // const user = await User.findById(params.userId).lean();

  return {
    props: {
      books: JSON.parse(JSON.stringify(books)),
      // user: JSON.parse(JSON.stringify(user)),
    },
  };
}
