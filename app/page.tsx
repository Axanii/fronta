import Image from "next/image";
import Link from "next/link";
import gandalf from "@/app/assets/images/gandalf.jpeg";
import styles from "@/app/styles/landingPageStyles.module.scss";
import LandingAuth from "./components/auth/LandingAuthContainer";

export default async function Home() {
  return (
    <main className={styles.landingContainer}>
      <header className={styles.header}>
        <span>
          Every page with its project will have its own animation, because I
          want to practice and understand the logic behind each of them. Sorry
          if it&apos;s ugly.
        </span>
        <div className={styles.authButtons}>
          <LandingAuth />
        </div>
      </header>
      <section className={`${styles.introduction}`}>
        <div className={styles.backgroundLayer} />
        <div className={styles.el} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className={styles.imageWrapper}>
            <Image
              id="me"
              src={gandalf}
              alt="Picture of myself"
              width={400}
              height={400}
              style={{
                borderRadius: "12px",
              }}
            />
          </div>

          <section className={styles.textContainer}>
            <div className={styles.introTextWrapper}>
              <h2>This is Max</h2>
              <p className={styles.text}>
                I am not Gandalf, hope that&apos;s obvious. I dont have much
                pictures, so I thought to insert something that came to my mind
                instead. I am a beginner in FrontEnd Development. I had some
                prior experience in a commercial project, however that was a
                while ago, and I think it&apos;s a good idea to start over. I
                strive to become a FullStack Engineer, and this website will be
                posted on a server using NodeJs, but for now, while I am working
                out all the details and bugs of my pet project, I will keep it
                local.
              </p>
            </div>
            <div className={styles.techStackWrapper}>
              <h3>My tech stack includes:</h3>
              <div className={styles.listContainer}>
                <ul className={styles.firstHalf}>
                  <li>HTML</li>
                  <li>CSS, SCSS, TailwindCSS</li>
                  <li>JavaScript, TypeScript</li>
                  <li>React</li>
                </ul>
                <ul>
                  <li>NextJS</li>
                  <li>
                    zustand, redux-toolkit(need some practice to remember)
                  </li>
                  <li>nextAuth, Auth0</li>
                  <li>
                    Some additional component libs I worked with along the way:
                    MUI, ChakraUI
                  </li>
                  <li>RestAPI</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </section>
      <section className={styles.projects}>
        <Link
          href={{
            pathname: "/calculator",
          }}
        >
          <span></span>
          gg
        </Link>
        <Link
          href={{
            pathname: "/tic-tac", // using object literal here, in case i need to add query(specify path)
          }}
        >
          <span></span>
          wp
        </Link>
        <Link
          href={{
            pathname: "/shinra",
          }}
        >
          <span></span>
          ss
        </Link>
        <Link
          href={{
            pathname: "/todo",
          }}
        >
          <span></span>
          todo
        </Link>
      </section>
    </main>
  );
}
