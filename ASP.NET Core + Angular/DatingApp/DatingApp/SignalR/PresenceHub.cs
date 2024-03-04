using DatingApp.Extensions;
using DatingApp.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace DatingApp.SignalR
{
    [Authorize]
    public class PresenceHub : Hub
    {
        private readonly PresenceTracker _tracker;
        private readonly IUnitOfWork _uow;

        public PresenceHub(PresenceTracker tracker, IUnitOfWork uow)
        {
            _tracker = tracker;
            _uow = uow;
        }

        public override async Task OnConnectedAsync()
        {
            var isOnline = await _tracker.UserConnected(Context.User.GetUsername(), Context.ConnectionId);
            if (isOnline)
                await Clients.Others.SendAsync("UserIsOnline", Context.User.GetUsername());

            var currentUsers = await _tracker.GetOnlineUsers();
            await Clients.Caller.SendAsync("GetOnlineUsers", currentUsers);
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            var user = await _uow.UserRepository.GetUserByUsernameAsync(Context.User.GetUsername());
            var isOffline = await _tracker.UserDisconnected(Context.User.GetUsername(), Context.ConnectionId);

            if (isOffline)
            {

                user.LastActive = DateTime.UtcNow;
                _uow.UserRepository.Update(user);
                await _uow.Complete();

                await Clients.Others.SendAsync("UserIsOffline", Context.User.GetUsername());
                //await Clients.Others.SendAsync("UserIsOffline", user);
            }

            await base.OnDisconnectedAsync(ex);
        }
    }

}
