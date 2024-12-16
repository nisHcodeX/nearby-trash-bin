import { AddTrashBin, FindTrashBin, TrashBin } from '@assets/img';
import TrashBinCard from '@components/card';
import './landing.scss'
import React from 'react'
import { useAppSelector } from '@hooks/hooks';
import { binListGetter, trashTypeGetter } from '@core/coreSlice';
import { TrashBinRes } from '@core/interface';
import { TRASH_TYPES } from '@constant/index';
import PlacesAutocomplete from 'react-places-autocomplete';
import GeocodingAutocomplete from '@components/autocomplete';

const TrashBinList = () => {
  const binList = useAppSelector(binListGetter);
  const trashgType = useAppSelector(trashTypeGetter);

const binHighlight = (bin: TrashBinRes)=>{
  if(bin.glass && trashgType == TRASH_TYPES.GLASS) return 'glass'
  if(bin.paper && trashgType == TRASH_TYPES.PAPER) return 'paper'
  if(bin.plastic && trashgType == TRASH_TYPES.PLASTIC) return 'plastic'
  if(bin.organic && trashgType == TRASH_TYPES.ORGANIC) return 'organic'
  else return ''
}

const trashTypeRender = (bin: TrashBinRes)=>{
  let trash = '';
  if(bin.glass) trash += 'glass '
  if(bin.paper)  trash += 'paper '
  if(bin.plastic) trash +=  'plastic '
  if(bin.organic) trash +=  'organic '
  
  return trash
}
  return (
    <>
      {binList && binList.length > 0 ?
        binList.map((bin: TrashBinRes) =>
          <TrashBinCard key={bin.id}>
            <>
              <div className={`d-flex flex-column justify-content-center align-items-center gap-5`}>
                <div className={`home-trash-bin-wrapper p-4 ${binHighlight(bin)}`}>
                  <div className='home-trash-bin-img-wrapper'>
                    <img className='home-trash-bin-img-wrapper' src={bin.imageUrl} />
                  </div>
                  <div style={{ backgroundImage: `url(${TrashBin})` }} className='list-trash-bin pt-3'>
                    <button type="button" className="btn btn-outline-secondary mt-4">Find Route</button>
                  </div>
                  <div className='list-trash-bin-text-container d-flex flex-column justify-content-center align-items-center gap-2 mt-6'>
                    <GeocodingAutocomplete initialLat={bin.latitude} initialLng={bin.longitude} disabled/>
                    <p >
                      Trash Type Available to dispose
                      <br/>
                      {trashTypeRender(bin)}
                    </p>
                  </div>
                </div>
              </div>

            </>
          </TrashBinCard>
        )
        :
        <TrashBinCard title='No Trash bin Were Found'>
          <div className='d-flex flex-column justify-content-center align-items-center gap-5'>
            You can suggest trash bin in the near area by clicking add trash bin
          </div>
        </TrashBinCard>
      }
    </>
  )
}

export default TrashBinList;