import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {

  static defaultProps = {
    country: 'in',
    PageSize: 8,
    category: 'general',
    totalResults: 0
  }

  static propTypes = {
    country: PropTypes.string,
    PageSize: PropTypes.number,
    category: PropTypes.string,
  }  

  capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
    }

  constructor(props){
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1, 
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - "News Station"`;
  }

  async updateNews(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eac7d70dfc424386950ef12464926dc4&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    this.props.setProgress(35);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }
  async componentDidMount(){
    this.updateNews();
  }

  // handleNextClick =  async () =>  {
  //  this.setState({page: this.state.page + 1})
  //  this.updateNews();
  // }

  // handlePrevClick = async () => {
  //   this.setState({page: this.state.page - 1})
  //   this.updateNews();
  // }

  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eac7d70dfc424386950ef12464926dc4&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles), 
      totalResults: parsedData.totalResults
    })
  };

  render() {
    return (
      <>
        <h1 className='text-center' style={{margin: "70px 0px 0px"}}>News Station - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll 
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {/* {!this.state.loading && this.state.articles.map((element)=>{ */}
            {this.state.articles.map((element)=>{
              return <div className="col md-4" key = {element.url}>
              <NewsItems title={element.title} description = {element.description?element.description.slice(0, 96):""} imageUrl = {element.urlToImage} newsUrl= {element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>

      {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick} > &larr; Previous</button>
        <button disabled= {this.state.page + 1 >= Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick} >Next &rarr; </button>
      </div> */}

      </>
    )
  }
}

export default News
