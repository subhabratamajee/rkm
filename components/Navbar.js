import { React, useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
// import { useSWR } from 'swr';
function Navbar() {
  const [open, setOpen] = useState(false);

  const [clientWindowHeight, setClientWindowHeight] = useState("");

  const [backgroundTransparacy, setBackgroundTransparacy] = useState(0);
  const [padding, setPadding] = useState(0);
  const [boxShadow, setBoxShadow] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    let backgroundTransparacyVar = clientWindowHeight / 600;

    if (backgroundTransparacyVar < 2) {
      let paddingVar = 40 - backgroundTransparacyVar * 90;
      let boxShadowVar = backgroundTransparacyVar * 5;
      setBackgroundTransparacy(backgroundTransparacyVar);
      setPadding(paddingVar);
      setBoxShadow(boxShadowVar);
    }
  }, [clientWindowHeight]);

  // const {data} = useSWR('../pages/api/me', async function(args) {
  //   const res = await fetch(args);
  //   return res.json();
  // });
  // const data = async function () {
  //   const res = await fetch("../pages/api/me");
  //   return res.json();
  // };
  // console.log(data);
  // if (!data) return <h1>Loading...</h1>;
  // let loggedIn = false;
  // if (data.email) {
  //   loggedIn = true;
  // }
// console.log(loggedIn);
  return (
    <div>
      <div
        className={styles.nav}
        style={{
          background: `rgba(110, 89, 25, ${backgroundTransparacy})`,
          padding: `${padding}px 0px`,
          boxShadow: `rgb(255 255 255 / ${boxShadow}) 0px 0px 20px 6px`,
          // borderBottom:`1px solid red`,
        }}
      >
        <div className={styles.logo}><span className={styles.r}>R</span>KMGEC</div>

        <div
          className={open === false ? styles.menubar : styles.close}
          onClick={() => setOpen(!open)}
        >
          <div
            className={
              open === false
                ? styles.menuicons
                : styles.menuicons + " " + styles.active
            }
          ></div>
          <div
            className={
              open === false
                ? styles.menuicons
                : styles.menuicons + " " + styles.active
            }
          ></div>
          <div
            className={
              open === false
                ? styles.menuicons
                : styles.menuicons + " " + styles.active
            }
          ></div>
        </div>
        <div
          className={
            open === false ? styles.navbar : styles.navbar + " " + styles.active
          }
          // className={styles.navbar}
        >
          <ul className={styles.ul}>
            <Link href="/"><a><li className={styles.li}>Home</li></a></Link>
            <Link href="/"><a><li className={styles.li}>about</li></a></Link>
            <Link href="/"><a><li className={styles.li}> events</li></a></Link>
            <Link href="/"><a><li className={styles.li}> Query</li></a></Link>
            
              <Link href="http://localhost:3000/user/login"><a><li className={styles.li}>
                login </li></a>
              </Link>
           
            <Link href="/"><a><li className={styles.li}>contacts</li></a></Link>
          </ul>
        </div>
      </div>

      <style jsx>{``}</style>
    </div>
  );
}

export default Navbar;
export async function getStaticProps () {
  // `getStaticProps` is executed on the server side.
  const article = await getArticleFromAPI()
  return {
    props: {
      fallback: {
        '/api/article': article
      }
    }
  }
}

