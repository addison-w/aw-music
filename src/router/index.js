import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Rank from 'components/rank/rank'
import Artist from 'components/artist/artist'
import ArtistDetail from 'components/artist-detail/artist-detail'
import RankDetail from 'components/rank/rank-detail'
import TrackList from 'components/recommend/track-list'
import Search from 'components/search/search'
import Favourite from 'components/favourite/favourite'

Vue.use(Router)

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
