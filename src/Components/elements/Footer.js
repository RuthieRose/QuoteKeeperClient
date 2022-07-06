import './footer.css'
export default function Footer() {
  let date = new Date().getFullYear()
  return (
    <footer>
      <div className="footer-container"> 
      <div className="citation">
      Inspirational quotes provided by <a href="https://zenquotes.io/" target="_blank" rel="noreferrer">ZenQuotes API</a>
      </div>
      <div className="site-author">Made with 💖 by <a href="mailto:doodlepath@gmail.com">ruthie </a> © {date}</div>
      </div>
    </footer>
  )
}