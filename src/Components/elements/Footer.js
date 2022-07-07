import './footer.css'
export default function Footer() {
  let date = new Date().getFullYear()
  return (
    <footer>
      <div className="footer-container"> 
      Inspirational quotes provided by <a href="https://zenquotes.io/" target="_blank" rel="noreferrer">ZenQuotes API</a>{' '}<span className="heart">✨</span> 
      {' '}Made with <span className="heart">💖</span> by <a href="mailto:doodlepath@gmail.com">ruthie </a> © {date}</div>
    </footer>
  )
}