import React from 'react';

const NewsItem=(props)=>{
    return <div>
        <div className="card my-5" style={{width:'18rem',backgroundColor:props.mode==='dark'?'black':'white',border:props.mode==='dark'?'1px solid white':'1px solid black'}}>
  <img src={!props.urlimg?"https://media.istockphoto.com/photos/abstract-digital-news-concept-picture-id1290904409?b=1&k=20&m=1290904409&s=170667a&w=0&h=6khncht98kwYG-l7bdeWfBNs_GGcG1pDqzLb6ZXhh7I=":props.urlimg} className="card-img-top" alt="..."/>
  <div className="card-body" style={{color:props.mode==='dark'?'white':'black'}}>
    <h5 className="card-title">{props.title}...</h5>
    <p className="card-text">{props.description}...</p>
    <span className="badge" style={{backgroundColor:'#bbeca0',color:'black'}}>{props.source}</span>
    <p className="card-text"><small style={{color:props.mode==='dark'?'yellow':'red'}}> By {!props.author?"Unknown":props.author} on {new Date(props.date).toGMTString()}</small></p>
    <a href={props.newsurl} rel="noopener noreferrer" target="_blank" className="btn btn-sm" style={{color:'black',backgroundColor:'#cfc697'}}>Read more</a>
  </div>
</div>
    </div>;
}

export default NewsItem;
