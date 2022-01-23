import styled from "styled-components";
import Link from "next/link";

const SubTitle = styled.h2`
  background-color: var(--primary);
  display: inline-block;
  padding: 5px;
  color: white;
`;

export default function Home(props) {
  console.log(props);
  return (
    <div>
      <header className="headerContainer">
        <img src={props.avatar_url} />
        <Link href="/sobre">
          <a>
            <h1>Mateus Marinho</h1>
          </a>
        </Link>
      </header>

      <section className="postsContainer">
        <SubTitle>My projects</SubTitle>
        {props.repos.map((project) => {
          return (
            <article className="postsContainer__post">
              <a target="_blank" href={project.link}>
                {project.repo}
              </a>
              <p>{project.description}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const githubResponse = await fetch(
    "https://api.github.com/users/marinhomateus"
  ).then((response) => response.json());

  const githubRepos = await fetch(
    "https://gh-pinned-repos.egoist.sh/?username=marinhomateus"
  ).then((response) => response.json());

  return {
    props: {
      avatar_url: githubResponse.avatar_url,
      repos: githubRepos,
    },
  };
}
