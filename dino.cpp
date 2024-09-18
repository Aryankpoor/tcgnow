#include<stdio.h>
#include<dos.h>
#include<stdlib.h>
#include<conio.h>

void getup()
{
    textcolor(BLACK);
    textbackground(15);
    clrscr();
    window(10,2,70,3); // Lol making dos games in cpp is just like pygame (a bit similar I mean but no ditto copy)
    cprint("Press Esc to Exit, Press Space to jump");
    window(62,2,80,3); 
    cprintf("SCORE: ");
    window(1,25,80,25); 
    for(int X=0;X<79;X++)
    cprintf("֍");

    // Okay lol hold up, so I couldn't figure out how to add the images and stuff so instead I opened
    // up charmap on windows and copied half of the special characters from there

    textcolor(0);
}

int t,speed=40;
void ds(int jump=0)
{
    static int a=1; 

    if(jump==0)
       t=0;
    else if(jump==2)
    t--;
    else t++;
    window(2,15-t,18,25);
    cprintf("                  ");
    cprintf("        ▄█▀▀█████▄");
    cprintf("        ██████████");
    cprintf("        ███████▀▀▀");  
    cprintf("        ▀▀▀▀▀▀▀▀▀ ");
    cprintf("▀       ▀▀▀▀▀▀    ");
    cprintf("██     ███████    ");
    cprintf("███   ███████████ ");
    cprintf(" █████████████  █ ");
    cprintf("  ████████████    ");
    cprintf("   ██████████     ");
}