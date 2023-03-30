import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'

const apiUrl = 'https://apis.ccbp.in/tg/packages'

class App extends Component {
  state = {
    packageData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getPackageData()
  }

  getPackageData = async () => {
    const response = await fetch(apiUrl)
    const fetchedData = await response.json()

    this.setState({
      packageData: fetchedData.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        imageUrl: eachData.image_url,
        description: eachData.description,
      })),
      isLoading: false,
    })
  }

  renderPackageList = () => {
    const {packageData} = this.state
    return (
      <ul className="package-list-container">
        {packageData.map(eachData => (
          <li className="list-container" key={eachData.id}>
            <img
              className="image"
              src={eachData.imageUrl}
              alt={eachData.name}
            />
            <p className="name">{eachData.name}</p>
            <p className="description">{eachData.description}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="Rings" color="#52bbf0" height={90} width={100} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="main-container">
        <h1 className="main-heading">Travel Guide</h1>
        <div className="app-container">
          {isLoading ? this.renderLoading() : this.renderPackageList()}
        </div>
      </div>
    )
  }
}
export default App
