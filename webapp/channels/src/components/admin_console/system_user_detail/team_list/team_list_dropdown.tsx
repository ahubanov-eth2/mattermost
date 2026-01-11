// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import EllipsisHorizontalIcon from 'components/widgets/icons/ellipsis_h_icon';
import Menu from 'components/widgets/menu/menu';
import MenuWrapper from 'components/widgets/menu/menu_wrapper';

import {localizeMessage} from 'utils/utils';

import type {TeamWithMembership} from './types';

type Props = {
    team: TeamWithMembership;
    doRemoveUserFromTeam: (teamId: string) => void;
    doMakeUserTeamAdmin: (teamId: string) => void;
    doMakeUserTeamMember: (teamId: string) => void;
    isDisabled?: boolean;
}

const TeamListDropdown = ({
    team,
    doRemoveUserFromTeam,
    doMakeUserTeamAdmin,
    doMakeUserTeamMember,
    isDisabled,
}: Props) => {
    const isAdmin = team.scheme_admin;
    const isMember = team.scheme_user && !team.scheme_admin;
    const isGuest = team.scheme_guest;
    const showMakeTeamAdmin = !isAdmin && !isGuest;
    const showMakeTeamMember = !isMember && !isGuest;

    return (
        <MenuWrapper
            isDisabled={this.props.isDisabled}
        >
            <button
                type='button'
                id={`teamListDropdown_${team.id}`}
                className='dropdown-toggle theme color--link style--none'
                aria-expanded='true'
            >
                <span className='SystemUserDetail__actions-menu-icon'><EllipsisHorizontalIcon/></span>
            </button>
            <div>
                <Menu
                    openLeft={true}
                    openUp={false}
                    ariaLabel={localizeMessage('team_members_dropdown.menuAriaLabel', 'Change the role of a team member')}
                >
                    <Menu.ItemAction
                        id='makeTeamAdmin'
                        show={showMakeTeamAdmin}
                        onClick={() => this.props.doMakeUserTeamAdmin(team.id)}
                        text={localizeMessage('team_members_dropdown.makeAdmin', 'Make Team Admin')}
                    />
                    <Menu.ItemAction
                        show={showMakeTeamMember}
                        onClick={() => this.props.doMakeUserTeamMember(team.id)}
                        text={localizeMessage('team_members_dropdown.makeMember', 'Make Team Member')}
                    />
                    <Menu.ItemAction
                        id='removeFromTeam'
                        show={true}
                        onClick={() => this.props.doRemoveUserFromTeam(team.id)}
                        text={localizeMessage('team_members_dropdown.leave_team', 'Remove from Team')}
                        buttonClass='SystemUserDetail__action-remove-team'
                    />
                </Menu>
            </div>
        </MenuWrapper>
    );
}
