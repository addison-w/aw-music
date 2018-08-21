import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Recommend = (resolve) => {
  import('components/recommend/recommend').then((module) => {
    resolve(module)
  })
}

const Rank = (resolve) => {
  import('components/rank/rank').then((module) => {
    resolve(module)
  })
}

const Artist = (resolve) => {
  import('components/artist/artist').then((module) => {
    resolve(module)
  })
}

const ArtistDetail = (resolve) => {
  import('components/artist-detail/artist-detail').then((module) => {
    resolve(module)
  })
}

const RankDetail = (resolve) => {
  import('components/rank/rank-detail').then((module) => {
    resolve(module)
  })
}

const TrackList = (resolve) => {
  import('components/recommend/track-list').then((module) => {
    resolve(module)
  })
}

const Search = (resolve) => {
  import('components/search/search').then((module) => {
    resolve(module)
  })
}

const Favourite = (resolve) => {
  import('components/favourite/favourite').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: './recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: TrackList
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: RankDetail
        }
      ]
    },
    {
      path: '/artist',
      name: 'artist',
      component: Artist,
      children: [
        {
          path: ':id',
          component: ArtistDetail
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/favourite',
      name: 'favourite',
      component: Favourite
    }
  ]
})
