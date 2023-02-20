import next from 'next';
import Image from 'next/image';

const Activity = () => {


    return (
      <div className='rounded-2xl bg-darkblue max-w-md mx-auto'>
        <div className='grid grid-cols-2 pt-3 pb-2 px-3'>
          <h4 className='text-white text-sm'>4 followers</h4>
          <div className='flex justify-end'>
            <h4 className='text-white text-sm truncate'>Torbjørn Smedegod</h4>
            <img className='h-5 px-2' src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'></img>
          </div>
        </div>
        <div className=''>
          <img className='' src='./placeholder.png'></img>
        </div>
        <div className='grid grid-cols-3 gap-4 pt-5 m-3'>
          <div className='flex flex-col justify-center items-center'>
            <img className='max-h-20' src='./Lifting-Icon.png'></img>
          </div>
          <div className='col-span-2 flex items-center'>
            <div>
              <h3 className='text-white text-xl -mt-2 truncate'>Aktivitetsnavn</h3>
              <p className='text-white text-md truncate'>Her står det noe om økten</p>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 p-4'>
          <button className='btn text-sm text-dark bg-lightblue rounded-full py-1.5'>Følger</button>
          <button className='btn text-sm text-white bg-salmon rounded-full'>Se hele</button>
        </div>
      </div>
    );
  };

  

export default Activity;
