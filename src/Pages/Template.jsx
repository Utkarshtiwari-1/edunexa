import React from 'react';
import dashimg from '../assets/Images/frame.png';
import Signupform from '../Components/common/SignupForm';
import { Loginform } from '../Components/common/Loginform';

/* Styles applied to every field inside the form (inputs, labels, submit button)
   without touching SignupForm / Loginform themselves. */
const fieldStyles = [
  // labels
  '[&_label]:text-sm [&_label]:font-medium [&_label]:text-[#C5C7D4] [&_label]:tracking-wide',
  // red star on mandatory fields
  '[&_label_sup]:ml-0.5 [&_label_sup]:text-base [&_label_sup]:font-bold [&_label_sup]:leading-none [&_label_sup]:text-red-500',
  // inputs
  '[&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-white/10',
  '[&_input]:bg-white/[0.06] [&_input]:px-4 [&_input]:py-2.5 [&_input]:text-white',
  '[&_input]:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] [&_input]:outline-none',
  '[&_input]:transition-all [&_input]:duration-200',
  '[&_input::placeholder]:text-[#6E727F]',
  '[&_input:hover]:border-[#8B5CF6]/50 [&_input:hover]:bg-white/[0.09]',
  '[&_input:focus]:border-[#22D3EE] [&_input:focus]:bg-white/[0.09]',
  '[&_input:focus]:shadow-[0_0_0_3px_rgba(139,92,246,0.28),0_0_18px_rgba(34,211,238,0.2)]',
  // Student / Instructor tab: container (any div that directly holds the tab buttons)
  '[&_div:has(>button:not([type=submit]))]:mx-auto [&_div:has(>button:not([type=submit]))]:w-fit [&_div:has(>button:not([type=submit]))]:gap-x-1',
  '[&_div:has(>button:not([type=submit]))]:rounded-full [&_div:has(>button:not([type=submit]))]:border [&_div:has(>button:not([type=submit]))]:border-[#8B5CF6]/25',
  '[&_div:has(>button:not([type=submit]))]:bg-white/[0.05] [&_div:has(>button:not([type=submit]))]:p-1',
  '[&_div:has(>button:not([type=submit]))]:shadow-[inset_0_2px_6px_rgba(0,0,0,0.35)]',
  // Student / Instructor tab: buttons
  '[&_button:not([type=submit])]:rounded-full [&_button:not([type=submit])]:px-6 [&_button:not([type=submit])]:py-2',
  '[&_button:not([type=submit])]:text-sm [&_button:not([type=submit])]:font-semibold',
  '[&_button:not([type=submit])]:transition-all [&_button:not([type=submit])]:duration-300',
  '[&_button:not([type=submit]):hover]:text-white',
  // submit button
  '[&_button[type=submit]]:rounded-xl [&_button[type=submit]]:py-2.5',
  '[&_button[type=submit]]:bg-gradient-to-r [&_button[type=submit]]:from-[#FFD60A] [&_button[type=submit]]:to-[#FB923C]',
  '[&_button[type=submit]]:font-semibold [&_button[type=submit]]:text-[#161D29]',
  '[&_button[type=submit]]:shadow-[0_6px_22px_rgba(251,146,60,0.3)]',
  '[&_button[type=submit]]:transition-all [&_button[type=submit]]:duration-300',
  '[&_button[type=submit]:hover]:-translate-y-0.5 [&_button[type=submit]:hover]:shadow-[0_10px_30px_rgba(251,146,60,0.5)]',
  '[&_button[type=submit]:active]:translate-y-0 [&_button[type=submit]:active]:scale-[0.98]',
].join(' ');

export const Template = ({title, desc1, desc2, image, formtype}) => {
  return (
    <div className='relative flex flex-col lg:flex-row text-white justify-evenly items-center flex-wrap w-full min-h-[calc(100vh-3.5rem)] px-4 py-8 gap-y-12 overflow-hidden'>

        {/* soft background glows */}
        <div className='pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#22D3EE]/20 blur-[130px]'></div>
        <div className='pointer-events-none absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-[#8B5CF6]/20 blur-[140px]'></div>
        <div className='pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-[#F472B6]/10 blur-[150px]'></div>

        {/* form card (wider, tighter vertically) */}
        <div className='relative z-10 flex flex-col gap-y-4 w-full max-w-[560px] rounded-2xl border border-[#8B5CF6]/20 bg-white/[0.04] p-6 sm:px-10 sm:py-7 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-md'>
            {/* thin accent line on top edge */}
            <div className='absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent'></div>

            <h1 className='text-3xl sm:text-4xl font-bold leading-tight tracking-tight bg-gradient-to-r from-white via-[#E0E7FF] to-[#A5B4FC] bg-clip-text text-transparent'>
                {title}
            </h1>
            <p className='leading-relaxed'>
                <span className='text-base sm:text-lg text-[#AFB2BF]'>{desc1}</span>
                <br />
                <span className='text-base sm:text-lg font-semibold italic bg-gradient-to-r from-[#22D3EE] via-[#8B5CF6] to-[#F472B6] bg-clip-text text-transparent'>
                    {desc2}
                </span>
            </p>

            <div className={`${fieldStyles} [&_form]:gap-y-3`}>
                {formtype === "signup" ? (<Signupform />) : (<Loginform />)}
            </div>
        </div>

        {/* image side */}
        <div className='relative z-10 mt-4 lg:mt-0 w-full max-w-[498px]'>
            <div className='absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-[#22D3EE]/25 via-[#8B5CF6]/15 to-[#F472B6]/20 blur-3xl'></div>
            <img className='z-10 w-full h-auto rounded-2xl opacity-90' src={dashimg} alt='pattern' height={578} width={498} loading='lazy' />
            <img className='z-50 absolute -top-4 right-4 w-full h-auto rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:-translate-y-1 hover:-translate-x-1' src={image} alt='logo' height={578} width={489} loading='lazy' />
        </div>
    </div>
  );
}