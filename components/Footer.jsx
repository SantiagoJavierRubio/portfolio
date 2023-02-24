/* eslint-disable tailwindcss/no-custom-classname */
const Footer = () => {
  return (
    <footer
      className="relative mt-8 max-w-full bg-gradient-to-t from-black/80 to-transparent p-8 pt-16"
      id="footer"
    >
      <div className="m-auto flex items-center justify-center gap-6 text-center text-2xl font-bold text-stone-200">
        <a
          href="https://github.com/SantiagoJavierRubio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="devicon-github-original" />
        </a>
        <a
          href="https://www.linkedin.com/in/santiago-javier-rubio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="devicon-linkedin-plain" />
        </a>
      </div>
      <p className="text-center text-sm font-thin text-stone-200/70">
        &copy; Santiago Javier Rubio - 2022
      </p>
    </footer>
  )
}

export default Footer
