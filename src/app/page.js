import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {

  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("")

  // This useEffect() runs at the beginning of page render because of the [] at the end
  useEffect(() => {
    UserLoggedIn();
  }, [])

  const UserLoggedIn = async () => {
    try{
      const { data: { user } } = await supabase.auth.getUser()
      const { data, error } = await supabase
        .from('users')
        .select(`username`)
        .eq('email', user.email)
      setUsername(data[0].username)
      setUser(user)
    } catch (e) {
      console.log("User not signed in")
    }
  }

  const SignOut = async () => {
    const { error } = await supabase.auth.signOut()
    window.location.reload();
  }

  const GameSearch = async (query) => {
    setSearchQuery(query);
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.cheapshark.com/api/1.0/deals?title=${query}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
    setLoading(false);
  };

  return (
    <main>
      <body>
        <h1 className={styles.center}>
          <Image
            className={styles.center}
            src="icon.svg"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </h1>

        <div className={styles.center}>
          <a href="/init"> ENTER </a>
        </div>
      </body>
    </main>
  );
}
