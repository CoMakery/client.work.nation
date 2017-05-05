import {d} from 'lightsaber/lib/log'
import React from 'react'

export default ({avatarImageIpfsKey, name}) => {
  d({avatarImageIpfsKey})
  if (avatarImageIpfsKey && !avatarImageIpfsKey.match(/^QmAVATAR/)) {
    return <img src={'//ipfs.io/ipfs/' + avatarImageIpfsKey} className="profile-photo" />
  } else {
    // return <img src={`https://robohash.org/${name || avatarImageIpfsKey}.png?size=150x150`} className="profile-photo" />
    return <img src="/static/images/icon_blank_avatar.svg" className="profile-photo" />
  }
}
