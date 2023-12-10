import React from "react"
import "./ELegend.scss"

export const ELegend = (props) => {

    const handleButtonCloseClick = () => {
        props.setShow()
    }

    return (
        <div className="legend shadow">

            <div className="legend__wrapper">

                <h5 className="legend__title">
                    Легенда карты:
                </h5>

                <div className="legend__block">

                    <div
                        className="legend__placemark legend__placemark--cluster"
                        style={{backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAAXNSR0IArs4c6QAABKZJREFUaEPVmn9M1GUcx98PBsqBQohMCQRP2ZkxUkklk+UGhqssaEVEbhYljSnNirWhG3+wCVuj5kLHwqTcjIhaWFbrEjdLM5BQu5F5Iy8QAqdwgeKhEDztc3uufb27732/dwbtef5i+z6fz/N6Pnx+Pc9zDHc4OOeRAFYBSAawBMA9AKIAhArVowDsAP4E8DuADgBtjLGhO1maBSrMOX8CQBaANQHqaAVgZox9GYi83+Cc8y0A8gHMdS34TV/TnJar34dfuNZh6HH8MXPg5kDwrcnRGfR9ZlDoRPSs6PF4w6JbS+ckO9LmPTzyaGzONQXsIIB6xthBfzagG5xzvgHANgBxtMCJK8fC67sOzG3u//ru0YkbTki9I3RG2ETmgsf+yk98aTA9JmNEyPUC2McYO6pHjy5wzvlOAE+5gKutlfNPXT0eoWcBrTlr560fLjaVXlZs4HPGWIWWnE9wzvkCALsBpJCikjOF8Q1ddTFaSgP5npdYcKVqZW2PkLUA2MUY61fTpQrOOTcCeIdc46y9NbSkfWui9fp5QyBQemVMs5c5qlL3d62IWkOZiFzndcaYzZu8V3Bh6RqCpsDb8fMLRsff/vmxXlj3eYa7wib2PPChTQQwwRd5s7waeB25B0G/0pKbxME1OTbGZiM9JgMpkalICDciMphSOTA0bkf3iA2WoXYKaHzbd1hTFwPDe2mNnQLewhgrcBfyAHcFIrnHsycfMfmy9OzgCBQlvYHNxkJEhURrAtEE+9gADtlqUdP5Nq6PD6vKkOU/WfedVbiNR8DeBi5SXiVpyziacq8vn85LfBE7kyt1A7sT0gYqOkrR0PWBKjz5/LENlt/EhFJlqnQHp/9jnFb22L28GluMRbosrDXpoK0Gu84Vq05TZJtexli2a+K/4KIiFlNhee5klklN095Vh5Adn6fF49f3wz0N2N62WVXm43Vmq8jz1a4KqwQ3UxnPPZG5RK24/JeWdqf0ZXkqUo3pzdSgDTLGqD+CE1w0TGW+rE0+XbVyv1+W9HdyyZmtqj6vsHo5NWYu8H3U5RWdzk840tvokR4oe/yYZQ04EPVugAL2IbPJa7bZFJc7ULO6vhtAK2NsGxP9dDMpT/oiYrm3hunNZeV4dSm1K1M/3r1QgbfOl3ksRI1Z55PD58SHTAKnrq+Sik1hyzNJ3tAsj1+ecmu71iWrp3w136uFatM+dRWlUgJ/DcDzZb/siK27uJeaqtsGVcT30z6belMrVni55WmvFbZg8fb+8vv39AH4iMCd/q2WTaYyk6hZQy3DKLJLK4E7i86D5sX39dzonuWu7Mj6U1gRtXpaLX7Wfhqbjq/1WDM+LOHmT1kXf6XOkcB/AGBQC8zp9G8tP1cEqIPA2yifL2wKSZ3kkx67vJQzhiAWNK0WJ46FTSEeaxLHpZyxdio9UoNL6yrSBqe06VDaAiRtyadLS/maLNGPy9fWSn2QEPDyHd0EOF0fy3dYFvDyXU8IcGdqpL+luhAS8M67cKmu4Fx9JOdcvktPYXU6e8p3zSzg5bvYV7iMfE8pynOTdI9XbvDyPRe6bUCuB1r3I7d0T+JeNvC//AjhH9XndWLxS1CLAAAAAElFTkSuQmCC)"}}
                    />

                    <div className="legend__label">
                        Несколько объектов рядом
                    </div>

                </div>

                <div className="legend__block">

                    <div
                        className="legend__placemark"
                        style={{backgroundImage: "url(data:image/png;base64,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)"}}
                    >
                        <div
                            className="legend__placemark-icon"
                            style={{backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgyNHYyNEgweiIvPjxwYXRoIGZpbGw9IiM4MDgyODUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTkgNWExIDEgMCAwIDEgLjk5LTFoNC4wMkExIDEgMCAwIDEgMTUgNXY0aDRhMSAxIDAgMCAxIDEgLjk5djQuMDJhMSAxIDAgMCAxLTEgLjk5aC00djRhMSAxIDAgMCAxLS45OSAxSDkuOTlBMSAxIDAgMCAxIDkgMTl2LTRINWExIDEgMCAwIDEtMS0uOTlWOS45OUExIDEgMCAwIDEgNSA5aDRWNXoiLz48L3N2Zz4=)"}}
                        />
                    </div>

                    <div className="legend__label">
                        Мед. организация
                    </div>

                </div>

                <div className="legend__block">

                    <div
                        className="legend__placemark"
                        style={{backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAApCAYAAABQgPsBAAAAAXNSR0IArs4c6QAABXtJREFUWEe9mEtsG0UYx/+zXufhxImbpxqpkqtKPRBVqYBjldJLpUqEQ6QegtQDl0TcUOGGROFe2rsF4lICqEQtJQcKlSiK0hOPkqKIBio5IOE4aRK/4jj27g76b3fciWN77ZDwSZbi7Mw3P3/vWQEfkVKGAZwF8BKAIQAnAfB/WQBLAP4B8BOAH4QQ/N++RNTa5QFMAJhsQnMMwGf7AaoKIqUcA3DZ++XY2ZHhQsGJlEqy3bZlyHEQMAzYgYDIB4Niu63NSLW2lq1Bq1wTQnzdxA/AHhApJQFepxICpFJ21HFki59SwxDFSCQQ14CmhRDX/Pap57tApJRvA6A7sLlpRwsFp7dRRWpdW5uxfuRIIO59p5s+bERHGcRzxxVuWluzXrAs2V6mFUAoZKCtzYBpChgG4DiAZUkUCg7yeQdSPj8uGBTZvj6TgUz5oBE3uSBeYN5hTFRaggDhcMA9vJYQKpu1XaAqlmHMvOYXwAqEmTHJmNjYsJierhCgs7MOQQVZLue4QEp6eswlL2ZiQghmVE0RnjW+54pk0jqlApOW6O4ONOLeXWvS6eeWYQAPDpqPvAXn6lmFIEzVK7o1hAAGBoJ13VHPTaurpXLMaFZ5Rwhxv9Y+grwP4NV02j6WzzsDXNjRYaCrq3lrqEMyGRtbW8/iJRQyVru7A38DmBVC8KyqQhD67sWnT62TpZJbztHba6KlpWbR9XVXsSixvm6567QM+lkIUbNKE4TxEV5ZKZ2WEq4ZBgf35xZFyCxKJkvuV1bgwcHgQ/YmIcS5ehb5kQ8TiRKbmitHjwZ9f7XfgkTiGYinj00RQoiXfUEOyyLNgPxfMbIkhHB7WDU59KzReg/nFfaymiCHWke6uwPxUMhY90aD6XogTFnODp16szuIyupl4ENmztzc3OTo6OifABjFzG1+yq3yUHuNcouUcsUwjDc0ADYkBeNWPr37ulY5qO5L5aq8x+Pxq8ePH2d5V4frIPzb0eeRVwBcpYKNDfvEzo4TUf5k72lmHuE+raLmxsfH37x161bGA6mEcOEOfEJT8MoaiUTi06Ghoa+qQBCgDFVtZnWbIBWyI2cy9jF9WvOrqLo1pJRb58+ff+vevXu5etZgANea4ukmAnUqIDXFW5YMqZ5UC6q/33xkmqK4vLz8eTQa/cYHgpbZ9rvXsAC51qkUvSXoz1Tbt207aZrmu16K6nGxyyVeOqd8e703wbHosSny01k5UioQTmT9/eYi68bs7Oz1sbGxP/Q4qGIZ1hQWu93B6ud/KaU722Yy9tDWlnO0cn0kEnjS3m6k8vn8bx0dHR83AJHwLLL3glUPRkrJEn2y8rrBPa2tRqqnJ/CEAXrx4sXrMzMzqQoQ3T1bAFaYD+US4WcF9VwN2bxuJpOl0/o+IWAPDAQf0SXz8/NfnDlzZqEOBC/tycpzfWNEA3EL3va2E0ml7BO6IlUzstnsYldX15c1XEIrsNdUfWPQDMieIZswKkvokgsXLnx09+5dHqhKucqQZQC8hj4bZKtIMyC8CQ7pdx/TFNvMEuqNxWKfTE1NMQP0WGAh47y66RcCDYFIKfmC5o5lyZa1NesUlTIu+vrMRa9wPYhGo5xLdYjHAH5XWXFQIBzxLufzTm86bUepVEvV5eHh4e/i8biaM9IAHgBY9Tt8V8A3slhKyVcLZ1VX1qpnfmJi4vbNmzcLnv9/BfALgGIjevcDUr77mKbIq1cOsVhsdmpqivWCn2+992nNMrjrfWNESsm3A9PFogzRLb295mPWi4WFhfsjIyNrAOY8V+wLoOGCpkBYyLiJELlc7q9wOMwZ4zYAxsR/Fl+L8AR1UfdOW7p06dJ7N27cYHE6MGkIxINx368KIdzr40HLv7nXXGejAk+7AAAAAElFTkSuQmCC)"}}
                    />

                    <div className="legend__label">
                        ФАП-ы
                    </div>

                </div>

                <div className="legend__block">

                    <div
                        className="legend__placemark"
                        style={{backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAABF5JREFUWEfFmEtsVGUUgL/TVvoY+oROnUCppKnEkiA1BBJNpBINBaELSBNjwIWBmEjRti6gIVGDQFtjaGPpRtiBCy3U2EWBDaFqjFQM1QhGm4q14NihpY9h+oC2vznDTL1zO1OmKs6fTDJz5/znfvc8/nPOFeaxjDFZwAvAM4ATSA98VMsQMAL0AV8C7SJyK1r1Eo2gMeZJ4E1gVTTyFpnvgXoR+fFB++YEMcZkBgBeBGZkp+/ciR/r6nJMejyJ0z5fvN4kzuGYSnA6J5ILCnxxCxdOWW5sgM+ARhHxRgKKCGKMKQLeBxTGv4bPn88evXw5c/z69dS5njBp+XJvypo1g+kbN1pd0w9UishP4faGBTHGvBywhP9pFWDo3DnXtNf7yINMbP0/LjX1XkZJidsCdA94T0Ta7HpmgRhjXgVeV8HpkZH4vhMnHhu/di1jPgB22aTCwqGcXbt+i0tLC7rsiIi0WOVCQIwxxcAHKnDX7U7sa2zMn/R4ku2KE7KzSV65ksTcXOLTNXFganiYid5exq5eZfLW7GRJcDrHcvbu7V7gck0E9L0mIt8Fdc+AGGNygU+ABWqJm7W1K+wQSfn5pG/aRMrq1XMaaLSzk+GzZxnv7g6RU5gl+/f/HLCMpnqZiAyokBWkFnheL7qPHs23uyOztJSM0tJ5eWiotZXB1taQPeomV1VVkLBZROpmQIwxK4CPg4F5u7l5mXX34p07SV2/fl4QQWFvezv9J0+G7M0qK/vdEsBbRcTtt4gx5ijwrH7vqaxcZc2Of2IJO7HdMppNefX1PwTkWkTkiBhjUoCLeiZpmlqtoTHhqq4Oa4nJgQF8HR1M3Ljh/z9x6VIca9eSsGhRWHl3TU1IzFisMgoUK4g6/m1/bBw+/Lj1sMopLw8bmBqIt8+cCXvDrO3b/QFtXxrAfceOzVzWQ8914MAvgQvlCqLpWqzHdk9FxUw6aIrm1tTMUjgXRFA4EkxvdXVIauc1NHQGysGnCqKR9ITvypU0T1NTQVBZanExi3fsCAFRd/Tu2xdV0ObW1c1yU/+pU3gvahTcX849e7ocRUWaxl8riB63Tnt8hMuUaKwxl1XsGWSJk18V5BsgYbCl5dGhtrYlQUXh4sNz/Di+S5eisohj3Tqcu3eHyNrjJGPz5puZ27b9CfgU5AsgJcYgowqixWdZjF3ToyAfAU/FOFi/VZB3gS0xTt/PFWRDoBOL5YFWpSCJwAU9pWN4xG8IFr1DQEmMil6riBwMguQB/uJht4pee8htQKmI/GFtjN4BtvqL3//XGJ0WEW3IQjo0V6BVTIlpq6hUxpingQ/1e8ya52BRMMa8Aryhvx/iOHFQREKa2UgD1ks6lQH/9YB1FzgU1YBlsYyOnNo03R9c/v3I6QEqRCTYlYVU5miH8C3WXfMcwqeB00CTiPgi9RDzeS3xFlAYVTPyt1AH0BDJClZdUYFY3JUDPAdodoV7UTOsx1CgZHwlIvryJqr1FwjxxY+ExOEPAAAAAElFTkSuQmCC)"}}/>

                    <div className="legend__label">
                        НП-ы
                    </div>

                </div>

                <div className="legend__block">

                    <div
                        className="legend__placemark"
                        style={{backgroundImage: "url(data:image/png;base64,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)"}}
                    />

                    <div className="legend__label">
                        Выбранный ФАП
                    </div>

                </div>

            </div>

            <div className="legend__controls">

                <button
                    className="legend__button legend__button--close"
                    onClick={handleButtonCloseClick}
                >
                    &#10006;
                </button>

            </div>

        </div>
    )
}