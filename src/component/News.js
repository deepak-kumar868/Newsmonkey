import React, {useState,useEffect} from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=>{
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setpage] = useState(1);

  const cap = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  let title = cap(props.category);
    document.title = `${title}-NewsMonkey`;

  const updateNews=async()=>{
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1047b34f231347aea92a076c2b98efbd&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(30);
    setLoading(true);
    let data = await fetch(url);
    let parseddata = await data.json();
    props.setProgress(60);
    setArticles(parseddata.articles);
    setTotalResults(parseddata.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  },[])

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1047b34f231347aea92a076c2b98efbd&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page+1);
    setLoading(true);
    let data = await fetch(url);
    let parseddata = await data.json();
    setArticles(articles.concat(parseddata.articles));
    setTotalResults(parseddata.totalResults);
    setLoading(false);
  }
    return (
      <>
        <div className="container">
          <h1 className="text-center" style={{fontSize:60,color:props.mode==='dark'?'white':'black',marginTop:60}}>
            NewsMonkey-Top {cap(props.category)} Headlines
          </h1>
          <InfiniteScroll
            dataLength={articles?.length || 0}
            next={fetchMoreData}
            hasMore={(articles?.length || 0)!==totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row">
                {articles?.map((element) => {
                  return (
                    <div className="col-md-3" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 40) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 80)
                            : ""
                        }
                        urlimg={element.urlToImage}
                        newsurl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                        mode={props.mode}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
}

News.defaultpropTypes = {
  country: "in",
  pageSize: 15,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
