// Criteo tracking for auctions product feed and artworks product feed

window.criteo_q = window.criteo_q || []
var pathSplit = location.pathname.split('/')
if (pathSplit[1] === 'auctions') {
  // Auctions events
  window.criteo_q.push(
    { event: 'setAccount', account: sd.CRITEO_AUCTIONS_ACCOUNT_NUMBER },
    { event: 'setSiteType', type: 'd' },
    { event: 'viewHome' }
  )
} else if (pathSplit[1] === 'auction') {
  if (pathSplit[3] === null) {
    window.criteo_q.push(
      { event: 'setAccount', account: sd.CRITEO_AUCTIONS_ACCOUNT_NUMBER },
      { event: 'setSiteType', type: 'd' },
      { event: 'viewList', item: sd.ARTWORKS.map(function (a) { return a._id }) }
    )
  } else if (pathSplit[3] === 'bid') {
    analyticsHooks.on('confirm:bid:form:success', function (data) {
      const price = data.max_bid_amount_cents ? data.max_bid_amount_cents / 100 : null
      window.criteo_q.push(
        { event: 'setAccount', account: sd.CRITEO_AUCTIONS_ACCOUNT_NUMBER },
        { event: 'setSiteType', type: 'd' },
        {
          event: 'trackTransaction',
          id: data.bidder_position_id,
          item: [
            {
              id: sd.SALE_ARTWORK.artwork._id,
              price: price,
              quantity: 1
            }
          ]
        }
      )
    })
  }
} else if (pathSplit[1] === 'artwork' && pathSplit[3] === null) {
  // Auctions event
  window.criteo_q.push(
    { event: 'setAccount', account: sd.CRITEO_AUCTIONS_ACCOUNT_NUMBER },
    { event: 'setSiteType', type: 'd' },
    { event: 'viewItem', item: sd.AUCTION && sd.AUCTION.artwork_id }
  )
  // Artworks events
  window.criteo_q.push(
    { event: 'setAccount', account: sd.CRITEO_ARTWORKS_ACCOUNT_NUMBER },
    { event: 'setSiteType', type: 'd' },
    { event: 'viewItem', item: sd.ARTWORK.id }
  )
  analyticsHooks.on('artwork:contact-gallery', function (data) {
    window.criteo_q.push(
      { event: 'setAccount', account: sd.CRITEO_ARTWORKS_ACCOUNT_NUMBER },
      { event: 'setSiteType', type: 'd' },
      {
        event: 'viewBasket',
        id: data.userId,
        item: [
          {
            id: sd.ARTWORK.id,
            price: sd.ARTWORK.price,
            quantity: 1
          }
        ]
      }
    )
  })
  analyticsHooks.on('inquiry:sync', function (data) {
    window.criteo_q.push(
      { event: 'setAccount', account: sd.CRITEO_ARTWORKS_ACCOUNT_NUMBER },
      { event: 'setSiteType', type: 'd' },
      {
        event: 'trackTransaction',
        id: data.userId,
        item: [
          {
            id: sd.ARTWORK.id,
            price: sd.ARTWORK.price,
            quantity: 1
          }
        ]
      }
    )
  })
} else {
  // Artworks events
  if (pathSplit[1] === 'collect') {
    window.criteo_q.push(
      { event: 'setAccount', account: sd.CRITEO_ARTWORKS_ACCOUNT_NUMBER },
      { event: 'setSiteType', type: 'd' },
      { event: 'viewHome' }
    )
  } else if (pathSplit[1] === 'artist' && pathSplit[3] === null) {
    window.criteo_q.push(
      { event: 'setAccount', account: sd.CRITEO_ARTWORKS_ACCOUNT_NUMBER },
      { event: 'setSiteType', type: 'd' },
      { event: 'viewList', sd.ARTWORKS.map(function (a) { return a._id }) }
    )
  }
}
