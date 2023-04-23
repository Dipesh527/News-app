// import React from "react";
// import NewsItem from "./NewsItem";

// const News = () => {
//   return (
//     <>
//       <div className="container my-4">
//         <div className="row">
//           <h2 className="top mb-4">Durshikshya News- Top Headlines</h2>
//           <div className="col-md-4">
//             <NewsItem
//               title="myTitle"
//               description="MyDesc"
//               imgUrl="https://techcrunch.com/wp-content/uploads/2023/03/GettyImages-142507970.jpg?resize=1200,701"
//             />
//           </div>
//           <div className="col-md-4">
//             <NewsItem title="myTitle" description="MyDesc" />
//           </div>
//           <div className="col-md-4">
//             <NewsItem title="myTitle" description="MyDesc" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default News;

import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  articles = [
    // {
    //   source: { id: "techcrunch", name: "TechCrunch" },
    //   author: "Manish Singh",
    //   title: "Ambani bats for cricket glory as Disney scales back in India",
    //   description:
    //     "Reliance's Jio, which has heavily poached talent from Disney's Hotstar, is counting on the IPL cricket tournament to make a dent in streaming.",
    //   url: "https://techcrunch.com/2023/03/31/ambani-bats-for-cricket-glory-as-disney-scales-back/",
    //   urlToImage:
    //     "https://techcrunch.com/wp-content/uploads/2023/03/GettyImages-142507970.jpg?resize=1200,701",
    //   publishedAt: "2023-03-31T08:21:52Z",
    //   content:
    //     "Mukesh Ambani’s Jio, the South Asian telecom powerhouse, has long sought to entice its customer base with a plethora of services aimed at boosting subscriber retention. Despite amassing over 425 mill… [+4123 chars]",
    // },
    // {
    //   source: { id: "espn-cric-info", name: "ESPN Cric Info" },
    //   author: null,
    //   title:
    //     "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //   description:
    //     "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //   url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //   urlToImage:
    //     "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //   publishedAt: "2020-04-27T11:41:47Z",
    //   content:
    //     "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    // },
    // {
    //   source: { id: "espn-cric-info", name: "ESPN Cric Info" },
    //   author: null,
    //   title:
    //     "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //   description:
    //     "Wides, lbw calls, swing - pl   enty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //   url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //   urlToImage:
    //     "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //   publishedAt: "2020-03-30T15:26:05Z",
    //   content:
    //     "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
    // },
  ];
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    console.log("Hello From news component .");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}- Durshikshya News`;
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e1e485935faa47b6a4d293cab622a697&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
    });
  }
  handlePrevButton = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/everything?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=e1e485935faa47b6a4d293cab622a697&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
    });
  };
  handleNextButton = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 12)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=e1e485935faa47b6a4d293cab622a697&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;

      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
      });
    }
  };
  render() {
    return (
      <>
        <div className="container my-4">
          <div className="row">
            <h2 className="top text-center mb-4">
              Durshikshya News - Top Headlines of{" "}
              {this.capitalizeFirstLetter(this.props.category)}
            </h2>
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0.45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page >= 1}
            className="btn btn-dark"
            onClick={this.handlePrevButton}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 12)
            }
            className="btn btn-dark"
            onClick={this.handleNextButton}
          >
            Next &rarr;
          </button>
        </div>
      </>
    );
  }
}

export default News;
