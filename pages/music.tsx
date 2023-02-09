import useSWR from 'swr'
import React from 'react';


export async function getStaticProps() {
    // const games = await getRecentlyGames();
    
  
    return {
      props: {
        games: null,//games.response['games']
      },
      revalidate: 1,
    };
}


const Games = () => {
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/playersummaries', fetcher);

  return (
    <section className="mb-16 container">
      <div>...</div>
    </section>
  );
};

export default Games;

